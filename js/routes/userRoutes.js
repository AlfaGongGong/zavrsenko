const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(dbConfig);

// Registration route
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log('hit')

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        res.status(200).json({ message: "Registration successful" });
      }
    );
  });
});

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error finding the user in the database:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        if (!match) {
          res.status(401).json({ message: "Invalid username or password" });
          return;
        }

        const token = jwt.sign(
          {
            id: results[0].id,
            username: results[0].username,
            email: results[0].email,
          },
          "your-secret-key",
          { expiresIn: "1h" }
        );

        res.status(200).json({ token });
      });
    }
  );
});

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
