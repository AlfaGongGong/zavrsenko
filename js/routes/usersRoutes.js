const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

// Handle user registration
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    // Insert the user's information into the database
    pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into database:", error);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        res.status(200).json({ message: "Registration successful" });
      }
    );
  });
});

module.exports = router;
