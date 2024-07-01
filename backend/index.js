const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
const fileRoutes=require("./routes/fileRoutes")
const connectDB=require("./config/db")
const fileUpload = require("express-fileupload");


const app = express();
dotenv.config();

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const PORT = process.env.PORT;

app.use("/api/v1/file",fileRoutes);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to compiler backend",
    });
});

// listen server
app.listen(PORT, () => {
    console.log(
        `Server running on PORT: ${PORT}`.bgBlue,
    );
});