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

const app = express();
dotenv.config();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());


const PORT = process.env.PORT;
const wssPort = process.env.WSS_PORT;
// console.log(wssPort)
const wss = new WebSocket.Server({ port: wssPort });
// console.log(wss)
wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket server");

    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.on("error", (error) => {
        console.log("Error occurred in WebSocket connection");
        console.error(error);
    });

    ws.on("close", () => {
        console.log("Client disconnected from WebSocket server");
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

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to compiler backend",
    });
});


app.use(errorMiddleware);

// listen server
app.listen(PORT, () => {
    console.log(
        `Server running on PORT: ${PORT}`.bgBlue
    );
});
