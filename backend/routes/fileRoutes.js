const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController,
    getFolderStructureController
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);
router.get("/file-structure/:projectId",authenticateToken, getFolderStructureController);

module.exports = router;
