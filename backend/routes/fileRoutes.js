const express = require("express");
const {
    uploadController
} = require("../controllers/fileController");
const router = express.Router();

router.post("/upload",uploadController);

module.exports = router;
