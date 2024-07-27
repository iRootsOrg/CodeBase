const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const { registerUser,
    loginUser,
    assignRole,
    startEditingSession, 
    joinEditingSession,
    getUserRoles,
    removeRoleFromUser,
    addCoauthor
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post('/start-editing-session', authenticateToken, startEditingSession)
router.post('/join-editing-session', authenticateToken, joinEditingSession)
router.post("/assign-role", assignRole);
router.get("/user-roles/:userId", getUserRoles);
router.post("/delete-role", removeRoleFromUser);
router.post("/add-coauthor",authenticateToken,addCoauthor);

module.exports = router