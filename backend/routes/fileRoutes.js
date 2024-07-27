const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController,
    getFolderStructureController,
    addOutputToTestcase,
    downloadProjectFiles,
    getTestcaseOutputs
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);
router.get("/file-structure/:projectId",authenticateToken, getFolderStructureController);
router.post("/add-output/:mainFileId",authenticateToken, addOutputToTestcase);
router.post("/download-project-files/:projectId", downloadProjectFiles);
router.get("/testcase-outputs/:mainFileId", getTestcaseOutputs);

module.exports = router;
