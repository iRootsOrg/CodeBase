const express = require("express");
const { registerUser, loginUser, startEditingSession, joinEditingSession } = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post('/start-editing-session', authenticateToken, startEditingSession)
router.post('/join-editing-session', authenticateToken, joinEditingSession)

module.exports = router
