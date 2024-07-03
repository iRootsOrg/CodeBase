const fs = require("fs");
const File = require("../models/fileModel.js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uploadController = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No file uploaded.");
    }

    const file = req.files.file;

    const fileData = {
        filename: file.name,
        language: req.body.language,
        file: file.data,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: req.body.author,
        tags: req.body.tags,
        description: req.body.description
    };

    try {
        const savedFile = await File.create(fileData);
        res.status(201).send(savedFile);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const decodeController = async (req, res) => {
    if (!req.body.fileId) {
        return res.status(400).send("No filename provided.");
    }

    try {
        const fileId = req.body.fileId;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).send("File not found.");
        }

        const decodedFile = Buffer.from(file.file, 'binary').toString('utf-8');
        res.status(200).send(decodedFile);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


module.exports = {
    uploadController,
    decodeController
}
