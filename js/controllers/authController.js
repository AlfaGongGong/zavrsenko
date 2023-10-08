const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken"); // Import JWT
const config = require("../config/config"); // Import your configuration
const router = express.Router();
const db = require("../config/db");

// Endpoint for user registration
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email is already registered
  const checkDuplicateUserQuery =
    "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkDuplicateUserQuery, [username, email], (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or email already registered" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Insert the new user into the database
      const insertUserQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
        if (err) {
          console.error("MySQL error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(201).json({ message: "Registration successful" });
      });
    });
  });
});

// Endpoint for user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Login failed" });
    }
    const user = results[0];

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!passwordMatch) {
        return res.status(401).json({ message: "Login failed" });
      }

      // Generate a unique token and secret
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      });
      const secret = uuid.v4();

      // Store the token and secret in the database
      const storeTokenQuery =
        "INSERT INTO user_tokens (user_id, token, secret) VALUES (?, ?, ?)";
      db.query(storeTokenQuery, [user.id, token, secret], (err) => {
        if (err) {
          console.error("MySQL error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({ message: "Login successful", token });
      });
    });
  });
});

// Endpoint for user logout
router.post("/logout", (req, res) => {
  // Get the user's token and secret from the session
  const { token, secret } = req.session.user;

  // Delete the token and secret from the database
  const deleteTokenQuery =
    "DELETE FROM user_tokens WHERE token = ? AND secret = ?";
  db.query(deleteTokenQuery, [token, secret], (err) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Clear the user session
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;
