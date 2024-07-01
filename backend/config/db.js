const mongoose = require("mongoose");
const path = require("path");
const colors=require("colors");

require("dotenv").config({path: path.join(__dirname, '..', '.env')})

const dbUrl = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUrl);
        console.log(`Connected to database....`.bgMagenta);
    } catch (error) {
        console.log(`Error in database connection ${error}`.bgRed);
    }
};

module.exports = connectDB;