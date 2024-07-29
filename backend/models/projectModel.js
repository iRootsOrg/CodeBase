const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rootFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    tags: [String],
}, {
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;