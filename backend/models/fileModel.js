const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    isFolder: {
        type: Boolean,
        default: false
    },
    content: {
        type: Buffer,
        required: function() { return !this.isFolder; }
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        default: null
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    language: {
        type: String,
        required: function() { return !this.isFolder; }
    },
    tags: [String],
    description: String,
    isInput: {
        type: Boolean,
        default: false
    },
    isOutput: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

fileSchema.virtual('fullPath').get(function() {
    return this.path + '/' + this.name;
});

fileSchema.statics.createFolderStructure = async function(structure, parentId = null, authorId) {
    const createdFiles = [];

    for (const item of structure) {
        const fileData = {
            name: item.name,
            path: item.path,
            isFolder: item.isFolder,
            authorId: authorId,
            parentFolder: parentId,
            isInput: item.isInput || false,
            isOutput: item.isOutput || false
        };

        if (!item.isFolder) {
            fileData.content = item.content;
            fileData.language = item.language;
        }

        const file = await this.create(fileData);

        if (item.isFolder && item.files) {
            const childFiles = await this.createFolderStructure(item.files, file._id, authorId);
            file.files = childFiles.map(f => f._id);
            await file.save();
        }

        createdFiles.push(file);
    }

    return createdFiles;
};

const File = mongoose.model("File", fileSchema);

module.exports = File;