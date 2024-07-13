const express = require("express");
const { registerUser,
    loginUser,
    assignRole,
    getUserRoles,
    removeRoleFromUser,
    addCoauthor
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/assign-role", assignRole);
router.get("/user-roles/:userId", getUserRoles);
router.post("/delete-role", removeRoleFromUser);
router.post("/add-coauthor",authMiddleware,addCoauthor);


module.exports = router
