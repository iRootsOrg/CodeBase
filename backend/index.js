const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fileRoutes = require("./routes/fileRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const WebSocket = require("ws");
const errorMiddleware = require("./middlewares/errorMiddleware");
const webSocketRoute = require("./routes/websocketRoutes");
const session = require("express-session");



const app = express();
dotenv.config();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
const wssPort = process.env.WSS_PORT || 8081;

const activeConnections = {};

const wss = new WebSocket.Server({ port: wssPort });

wss.on("connection", (ws) => {
    const id = Date.now(); 
    activeConnections[id] = ws;

    console.log("Client connected to WebSocket server");

    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
        const parsedMessage = JSON.parse(message);
        const { code } = parsedMessage;
        // Broadcast the message to all connected clients except the sender
        Object.keys(activeConnections).forEach((key) => {
            if (activeConnections[key] !== ws && activeConnections[key].readyState === WebSocket.OPEN) {
                activeConnections[key].send(JSON.stringify({ code }));
            }
        });
    });

    ws.on("error", (error) => {
        console.log("Error occurred in WebSocket connection");
        console.error(error);
    });

    ws.on("close", () => {
        console.log("Client disconnected from WebSocket server");
        delete activeConnections[id];
    });
});

app.get('/health-check', (req, res) => {
    if (wss && wss.listeners('connection').length > 0) {
        res.status(200).send('WebSocket server is running');
    } else {
        res.status(500).send('WebSocket server is not running');
    }
});

app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use(webSocketRoute);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to compiler backend",
    });
});


app.get('/wss', (req, res) => {
    res.render('index');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`.bgBlue);
});