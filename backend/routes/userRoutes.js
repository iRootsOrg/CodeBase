const express = require("express");
const { registerUser, loginUser, startEditingSession, joinEditingSession } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post('/start-editing-session', startEditingSession)
router.post('/join-editing-session', joinEditingSession)

module.exports = router
