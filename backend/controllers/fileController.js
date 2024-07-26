const fs = require("fs");
const File = require("../models/fileModel.js");
const Project = require("../models/projectModel.js");
const dotenv = require("dotenv");
const path = require("path");
const CustomError = require("../utils/CustomError.js");

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prepareFileStructure = (files) => {
    const structure = {};

    for (const [key, file] of Object.entries(files)) {
        const parts = key.split('[').map(part => part.replace(']', ''));
        let current = structure;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
                // It's a file
                const isInput = key === 'input_file';
                const isOutput = key === 'output_file';
                current[part] = {
                    name: file.name,
                    path: parts.slice(0, -1).join('/') || '/',
                    isFolder: false,
                    content: file.data,
                    language: path.extname(file.name).slice(1) || 'txt',
                    isInput,
                    isOutput
                };
            } else {
                // It's a folder
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }

    const result = convertToArray(structure);
    return result;
};

const convertToArray = (obj, parentPath = '') => {
    return Object.entries(obj).map(([name, content]) => {
        const currentPath = parentPath ? `${parentPath}/${name}` : name;
        if (content.isFolder === false) {
            // It's a file
            return content;
        } else {
            // It's a folder
            return {
                name,
                path: parentPath || '/',
                isFolder: true,
                files: convertToArray(content, currentPath)
            };
        }
    });
};

const uploadController = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new CustomError("No files uploaded.", 400);
        }

        if (!req.userId) {
            throw new CustomError("User not authenticated.", 401);
        }

        let tags = [];
        if (req.body.tags) {
            tags = req.body.tags.replace(/^\[|\]$/g, '').split(',').map(tag => tag.trim());
        }

        const project = await Project.create({
            name: req.body.projectName || "Untitled Project",
            description: req.body.description || "",
            authorId: req.userId,
            tags: tags
        });

        const folderStructure = prepareFileStructure(req.files);
        const createdFiles = await File.createFolderStructure(folderStructure, null, req.userId, project._id);

        const inputFile = createdFiles.find(f => f.isInput);
        const outputFile = createdFiles.find(f => f.isOutput);

        if (!inputFile || !outputFile) {
            throw new CustomError("Input or output file not found in uploaded files.", 400);
        }

        const rootFolder = createdFiles.find(f => f.parentFolder === null && f.isFolder);
        if (rootFolder) {
            project.rootFolder = rootFolder._id;
            await project.save();
        }

        res.status(201).json({ 
            message: "Project created and files uploaded successfully", 
            projectId: project._id,
            rootFolderId: rootFolder ? rootFolder._id : null 
        });
    } catch (error) {
        next(error);
    }
};

const decodeController = async (req, res, next) => {
    const fileId = req.params.id;
    if (!fileId) {
        throw new CustomError("No fileId provided.", 400);
    }

    try {
        const file = await File.findById(fileId);
        if (!file) {
            throw new CustomError("File not found.", 404);
        }

        if (file.isFolder) {
            // If it's a folder, return its contents
            const contents = await File.find({ parentFolder: fileId }).select('-content');
            res.status(200).json(contents);
        } else {
            // If it's a file, return its decoded content
            const decodedContent = file.content.toString('utf-8');
            res.status(200).send(decodedContent);
        }
    } catch (error) {
        next(error);
    }
};

const searchFiles = async (req, res, next) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: "No search query provided." });
    }

    try {
        // Ensure indexes are created before querying
        await File.init();

        const results = await File.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.status(200).json(results);
    } catch (error) {
        if (error.code === 27) {
            res.status(500).json({ status: "error", statusCode: 500, message: "text index required for $text query" });
        } else {
            next(error);
        }
    }
}

const getFolderStructureController = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.userId;

        const project = await Project.findOne({ _id: projectId, authorId: userId });
        if (!project) {
            throw new CustomError("Project not found or you don't have access to it.", 404);
        }

        const structure = await File.getProjectFileStructure(projectId);
        const response = {
            projectId: project._id,
            projectName: project.name,
            description: project.description,
            tags: project.tags,
            fileStructure: structure
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadController,
    decodeController,
    searchFiles,
    getFolderStructureController
};
