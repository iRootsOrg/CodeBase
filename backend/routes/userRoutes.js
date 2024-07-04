const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);

module.exports = router
