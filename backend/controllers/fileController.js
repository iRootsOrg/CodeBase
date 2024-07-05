const fs = require("fs");
const File = require("../models/fileModel.js");
const dotenv = require("dotenv");
const path = require("path");
const CustomError = require("../utils/CustomError.js");

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

const uploadController = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new CustomError("No files uploaded.", 400);
        }

        const mainFile = req.files.file;
        if (!mainFile) {
            throw new CustomError("No main file named 'file' found in the request.", 400);
        }

        
        if (!req.userId) {
            throw new CustomError("User not authenticated.", 401);
        }

        let testCases;
        try {
            testCases = JSON.parse(req.body.testCases);
            if (!Array.isArray(testCases)) {
                testCases = [testCases]; 
            }
        } catch (error) {
            throw new CustomError("Invalid testCases format. Must be a valid JSON array.", 400);
        }

        if (!testCases.every(testCase => 
            Array.isArray(testCase.inputs) && Array.isArray(testCase.outputs)
        )) {
            throw new CustomError("Invalid testCase structure. Each testCase must have 'inputs' and 'outputs' arrays.", 400);
        }

        
        const processedTestCases = await Promise.all(testCases.map(async testCase => ({
            inputs: await Promise.all(testCase.inputs.map(async input => {
                if (input.type === 'file' && input.file) {
                    const uploadedFile = req.files[input.file];
                    if (!uploadedFile) {
                        throw new CustomError(`File ${input.file} not found in the request.`);
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
        next(error);
    }
};

const decodeController = async (req, res, next ) => {
    const fileId = req.params.id;
    if (!fileId) {
        throw new CustomError("No fileId provided.", 400);
    }

    try {
        const file = await File.findById(fileId);
        if (!file) {
            throw new CustomError("File not found.", 404)
        }

        const decodedFile = Buffer.from(file.file, 'binary').toString('utf-8');
        res.status(200).send(decodedFile);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadController,
    decodeController
};