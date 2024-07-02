const express = require("express");
const {
    uploadController,
    decodeController
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",uploadController);
router.get("/decode",decodeController);

module.exports = router;
