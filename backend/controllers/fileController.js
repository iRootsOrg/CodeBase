const fs = require("fs");
const archiver = require('archiver')
const File = require("../models/fileModel.js");
const Project = require("../models/projectModel.js");
const dotenv = require("dotenv");
const path = require("path");
const CustomError = require("../utils/CustomError.js");

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const determineFileType = (fileName, mainFileName) => {
    if (fileName === mainFileName) return 'main';
    if (fileName.toLowerCase().includes('input')) return 'input';
    return 'other';
};

const prepareFileStructure = (files, mainFileName) => {
    const structure = {};

    for (const [key, file] of Object.entries(files)) {
        const parts = key.split('[').map(part => part.replace(']', ''));
        let current = structure;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
                // It's a file
                const fileType = determineFileType(file.name, mainFileName);
                current[part] = {
                    name: file.name,
                    path: '/' + parts.slice(0, -1).join('/'),  // Add leading slash
                    isFolder: false,
                    content: file.data,  // Use file.data directly
                    language: path.extname(file.name).slice(1) || 'txt',
                    fileType: fileType
                };
            } else {
                // It's a folder
                if (!current[part]) {
                    current[part] = {
                        name: part,
                        path: '/' + parts.slice(0, i).join('/'),  // Add leading slash
                        isFolder: true,
                        files: {}
                    };
                }
                current = current[part].files;
            }
        }
    }

    return convertToArray(structure);
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
                files: convertToArray(content.files, currentPath)
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

        const mainFileName = req.body.mainFile;

        const project = await Project.create({
            name: req.body.projectName || "Untitled Project",
            description: req.body.description || "",
            authorId: req.userId,
            tags: tags
        });

        const folderStructure = prepareFileStructure(req.files, mainFileName);

        const createdFiles = await File.createFolderStructure(folderStructure, null, req.userId, project._id);

        const inputFiles = createdFiles.filter(f => f.fileType === 'input');

        const mainFile = createdFiles.find(f => f.fileType === 'main');

        if (!inputFiles.length) {
            throw new CustomError("No input files found in uploaded files.", 400);
        }

        const rootFolder = createdFiles.find(f => f.parentFolder === null && f.isFolder);
        if (rootFolder) {
            project.rootFolder = rootFolder._id;
            await project.save();
        }

        if (mainFile) {
            mainFile.testcases = inputFiles.map(inputFile => ({
                input: inputFile._id,
            }));
            await mainFile.save();
        }

        res.status(201).json({
            message: "Project created and files uploaded successfully",
            projectId: project._id,
            rootFolderId: rootFolder ? rootFolder._id : null,
            mainFileId: mainFile ? mainFile._id : null,
            testcasesCount: mainFile ? mainFile.testcases.length : 0
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
            res.status(200).json({
                content: decodedContent,
                language: file.language,
                fileType: file.fileType
            });
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

const updateController = async (req, res, next) => {
    try {
        const { projectId, changes } = req.body;

        if (!projectId || !changes || changes.length === 0) {
            throw new CustomError("Project ID and changes must be provided.", 400);
        }

        const userId = req.userId;
        const updatedFiles = [];

        for (const change of changes) {
            const { fileId, newContent } = change;

            if (!fileId || !newContent) {
                throw new CustomError("fileId and newContent must be provided for each change.", 400);
            }

            const file = await File.findById(fileId);
            if (!file) {
                throw new CustomError(`File with id ${fileId} not found.`, 404);
            }

            if (file.authorId.toString() !== userId) {
                throw new CustomError(`You do not have permission to update file with id ${fileId}.`, 403);
            }

            file.content = Buffer.from(newContent, 'utf-8');
            await file.save();
            updatedFiles.push(file);
        }

        res.status(200).json({
            message: "Files updated successfully",
            updatedFiles
          });
    } catch (error) {
        next(error);
    }
};

const addOutputToTestcase = async (req, res, next) => {
    try {
        const { mainFileId } = req.params;

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new CustomError("No output files uploaded.", 400);
        }

        const mainFile = await File.findById(mainFileId);
        if (!mainFile) {
            throw new CustomError("Main file not found.", 404);
        }

        const outputFiles = Array.isArray(req.files.outputFile) ? req.files.outputFile : [req.files.outputFile];

        if (outputFiles.length !== mainFile.testcases.length) {
            throw new CustomError("Number of output files does not match number of testcases.", 400);
        }

        const updatedTestcases = await Promise.all(mainFile.testcases.map(async (testcase, index) => {
            const outputFile = outputFiles[index];

            const newOutputFile = await File.create({
                name: outputFile.name,
                path: '/outputs',
                isFolder: false,
                content: outputFile.data,
                authorId: req.userId,
                projectId: mainFile.projectId,
                language: 'txt',
                fileType: 'output'
            });

            return {
                ...testcase,
                output: newOutputFile._id
            };
        }));

        mainFile.testcases = updatedTestcases;
        await mainFile.save();

        res.status(200).json({
            message: "Output files added to testcases successfully",
            updatedTestcasesCount: updatedTestcases.length
        });
    } catch (error) {
        next(error);
    }
}; 

const downloadProjectFiles = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }

        const zip = archiver('zip', {
            zlib: { level: 9 }
        });

        res.attachment(`project-${projectId}.zip`);
        zip.pipe(res);

        const files = await File.find({ projectId });

        const folderMap = new Map();

        files.forEach(file => {
            if (file.isFolder) {
                folderMap.set(file._id.toString(), file.path);
            }
        });

        files.forEach(file => {
            if (!file.isFolder) {
                let fullPath = file.path ? `${file.path}/${file.name}` : file.name;
                fullPath = fullPath.replace(/^\//, '');
                zip.append(file.content, { name: fullPath });
            }
        });

        zip.finalize();
    } catch (error) {
        next(error);
    }
};

const getTestcaseOutputs = async (req, res, next) => {
    try {
        const { mainFileId } = req.params;

        const mainFile = await File.findById(mainFileId).populate({
            path: 'testcases.input testcases.output',
            select: 'name content'
        });

        if (!mainFile) {
            throw new CustomError("Main file not found.", 404);
        }

        const testcaseOutputs = await Promise.all(mainFile.testcases.map(async (testcase, index) => {
            let inputContent = null;
            let outputContent = null;

            if (testcase.input) {
                const inputFile = await File.findById(testcase.input);
                inputContent = inputFile ? inputFile.content.toString('utf-8') : null;
            }

            if (testcase.output) {
                const outputFile = await File.findById(testcase.output);
                outputContent = outputFile ? outputFile.content.toString('utf-8') : null;
            }

            return {
                testcaseIndex: index,
                inputFileName: testcase.input ? testcase.input.name : null,
                inputContent: inputContent,
                outputFileName: testcase.output ? testcase.output.name : null,
                outputContent: outputContent
            };
        }));

        res.status(200).json({
            mainFileName: mainFile.name,
            testcaseOutputs: testcaseOutputs
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadController,
    decodeController,
    searchFiles,
    getFolderStructureController,
    updateController,
    addOutputToTestcase,
    downloadProjectFiles,
    getTestcaseOutputs
};

