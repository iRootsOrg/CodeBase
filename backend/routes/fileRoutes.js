const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController,
    searchFiles
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);
router.get("/search", searchFiles);

module.exports = router;
