const express = require("express");
const router = express.Router();
const authController = require("../../controllers/user/auth.controller");

// POST /api/user/signup - Create user
router.post("/signup", authController.signup);

// POST /api/user/login - Login user
router.post("/login", authController.login);

// POST /api/user/logout - Logout user (JWT Blacklist)
router.post("/logout", authController.logout);

module.exports = router;