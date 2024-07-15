const express = require("express");
const { registerUser,
    loginUser,
    assignRole,
    getUserRoles,
    removeRoleFromUser,
    addCoauthor
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const RoleAssignmentController = require("../controllers/roleAssignmentController");
const roleAssignmentController = new RoleAssignmentController();

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/assign-role", assignRole);
router.get("/user-roles/:userId", getUserRoles);
router.post("/delete-role", removeRoleFromUser);
router.post("/add-coauthor",authMiddleware,addCoauthor);
router.post('/assign-role', roleAssignmentController.assignRoleToUser);
router.post('/remove-role', roleAssignmentController.removeRoleFromUser);
router.get('/user-roles/:userId', roleAssignmentController.getUserRoles);

module.exports = router
