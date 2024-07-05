const fs = require("fs");
const File = require("../models/fileModel.js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const handleFileUpload = async (file, authorId) => {
    const fileData = {
        filename: file.name,
        language: file.language,
        file: file.data,
        authorId: authorId,  
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: file.tags || [],
        description: file.description || ''
    };

    const savedTestCaseFile = await File.create(fileData);
    return savedTestCaseFile._id;
};

const parseTestCases = async (testCases) => {
    return Promise.all(testCases.map(async testCase => ({
        inputs: await Promise.all(testCase.inputs.map(async input => {
            if (input.type === 'file' && input.file) {
                const fileId = await handleFileUpload(input.file);
                return {
                    type: 'file',
                    reference: fileId,
                };
            } else {
                return {
                    type: 'direct',
                    content: input.content,
                };
            }
        })),
        outputs: await Promise.all(testCase.outputs.map(async output => {
            if (output.type === 'file' && output.file) {
                const fileId = await handleFileUpload(output.file);
                return {
                    type: 'file',
                    reference: fileId,
                };
            } else {
                return {
                    type: 'direct',
                    content: output.content,
                };
            }
        }))
    })));
};

const uploadController = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files uploaded.");
        }

        const mainFile = req.files.file;
        if (!mainFile) {
            return res.status(400).send("No main file named 'file' found in the request.");
        }

        
        if (!req.userId) {
            return res.status(401).send("User not authenticated.");
        }

        let testCases;
        try {
            testCases = JSON.parse(req.body.testCases);
            if (!Array.isArray(testCases)) {
                testCases = [testCases]; 
            }
        } catch (error) {
            return res.status(400).send("Invalid testCases format. Must be a valid JSON array.");
        }

        if (!testCases.every(testCase => 
            Array.isArray(testCase.inputs) && Array.isArray(testCase.outputs)
        )) {
            return res.status(400).send("Invalid testCase structure. Each testCase must have 'inputs' and 'outputs' arrays.");
        }

        
        const processedTestCases = await Promise.all(testCases.map(async testCase => ({
            inputs: await Promise.all(testCase.inputs.map(async input => {
                if (input.type === 'file' && input.file) {
                    const uploadedFile = req.files[input.file];
                    if (!uploadedFile) {
                        throw new Error(`File ${input.file} not found in the request.`);
                    }
                    const fileId = await handleFileUpload({
                        name: uploadedFile.name,
                        data: uploadedFile.data,
                        language: path.extname(uploadedFile.name).slice(1)
                    }, req.userId);  // Pass req.userId here
                    return { type: 'file', reference: fileId };
                } else {
                    return input;
                }
            })),
            outputs: await Promise.all(testCase.outputs.map(async output => {
                if (output.type === 'file' && output.file) {
                    const uploadedFile = req.files[output.file];
                    if (!uploadedFile) {
                        throw new Error(`File ${output.file} not found in the request.`);
                    }
                    const fileId = await handleFileUpload({
                        name: uploadedFile.name,
                        data: uploadedFile.data,
                        language: path.extname(uploadedFile.name).slice(1)
                    }, req.userId);  // Pass req.userId here
                    return { type: 'file', reference: fileId };
                } else {
                    return output;
                }
            }))
        })));

        const fileData = {
            filename: mainFile.name,
            language: req.body.language,
            file: mainFile.data,
            authorId: req.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
            description: req.body.description,
            testCases: processedTestCases
        };

        const savedFile = await File.create(fileData);
        res.status(201).send({ fileId: savedFile._id });
    } catch (error) {
        console.error('Error in uploadController:', error);
        res.status(500).send({ error: error.message || "An error occurred while processing your request." });
    }
};

const decodeController = async (req, res) => {
    const fileId = req.params.id;
    if (!fileId) {
        return res.status(400).send("No fileId provided.");
    }

    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).send("File not found.");
        }

        const decodedFile = Buffer.from(file.file, 'binary').toString('utf-8');
        res.status(200).send(decodedFile);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    uploadController,
    decodeController
};