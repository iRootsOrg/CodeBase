const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    language: {
        type:String,
        required:true
    }, 
    file: {
        type: Buffer,
        required:true
    }, 
    createdAt: {
        type:Date,
        required:true
    }, 
    updatedAt: {
        type:Date,
        default: Date.now
    },
    author: {
        type:String,
        required: true
    },
    tags: {
        type:[String],
        unique: true
    }, 
    description: {
        type:String
    } 
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
