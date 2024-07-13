const mongoose = require("mongoose");

const inputOutputSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['file', 'direct'],
        required: true
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: function() { return this.type === 'file'; }
    },
    content: {
        type: String,
        required: function() { return this.type === 'direct'; } 
    },
    _id:false
});

const testCaseSchema = new mongoose.Schema({
    inputs: [inputOutputSchema],
    outputs: [inputOutputSchema],
    _id: false
});

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
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
        required: true,
    },
    createdAt: {
        type:Date,
        required:true
    }, 
    updatedAt: {
        type:Date,
        default: Date.now
    },
    tags: {
        type:[String],
    }, 
    description: {
        type:String
    },
    testCases: [testCaseSchema]
});

const File = mongoose.model("File", fileSchema);

module.exports = File;


