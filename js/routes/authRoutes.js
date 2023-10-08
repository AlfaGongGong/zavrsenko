const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint for user registration
router.post("/register", authController.register);

// Endpoint for user login
router.post("/login", authController.login);

// Endpoint for user logout
router.post("/logout", authController.logout);

module.exports = router;
