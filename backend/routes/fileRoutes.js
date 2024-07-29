const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController,
    searchFiles,
    getFolderStructureController,
    updateController,
    addOutputToTestcase,
    downloadProjectFiles,
    getTestcaseOutputs
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);
router.get("/search", searchFiles);
router.get("/file-structure/:projectId",authenticateToken, getFolderStructureController);
router.put("/update", authenticateToken, updateController);
router.post("/add-output/:mainFileId",authenticateToken, addOutputToTestcase);
router.post("/download-project-files/:projectId", downloadProjectFiles);
router.get("/testcase-outputs/:mainFileId", getTestcaseOutputs);

module.exports = router;