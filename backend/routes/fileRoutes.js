const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController,
    searchFiles,
    getFolderStructureController
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);
router.get("/search", searchFiles);
router.get("/file-structure/:projectId",authenticateToken, getFolderStructureController);

module.exports = router;
