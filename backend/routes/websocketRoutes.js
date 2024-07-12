const express = require("express");
const { startWebSocket } = require("../controllers/websocketController");
const router = express.Router();

router.get("/websocket", startWebSocket);

module.exports = router;