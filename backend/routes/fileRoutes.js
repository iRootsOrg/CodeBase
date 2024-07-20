const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
    uploadController,
    decodeController
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",authenticateToken,uploadController);
router.get("/decode/:id",decodeController);

module.exports = router;
