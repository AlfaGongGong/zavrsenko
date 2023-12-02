const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");

// Endpoint for admin registration
router.post("/register", adminAuthController.register);

// Endpoint for admin login
router.post("/login", adminAuthController.login);

// Endpoint for admin logout
router.post("/logout", adminAuthController.logout);

module.exports = router;
