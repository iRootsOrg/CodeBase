const mongoose = require("mongoose");
const path = require("path");
const colors=require("colors");
const File = require("../models/fileModel");

require("dotenv").config({path: path.join(__dirname, '..', '.env')})

const dbUrl = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUrl)
        console.log(`Connected to database....`.bgMagenta);
        // Ensure indexes are created
        await File.init();
        const indexes = await File.collection.listIndexes().toArray();
        console.log("Indexes:", indexes);

    } catch (error) {
        console.log(`Error in database connection ${error}`.bgRed);
        console.error("Error connecting to MongoDB or creating index:", error);
    }
};

module.exports = connectDB;