const express = require("express");
const { startWebSocket } = require("../controllers/websocketController");
const router = express.Router();

router.get("/ws", startWebSocket);

module.exports = router;