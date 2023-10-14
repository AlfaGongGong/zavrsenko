const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

// Endpoint for user registration
router.post("/register", (req, res) => {
  const { username, email, password, first_name, last_name, address } =
    req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are mandatory" });
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  pool
    .execute("SELECT * FROM users WHERE username = ? OR email = ?", [
      username,
      email,
    ])
    .then(([results]) => {
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
        const insertUserQuery = `INSERT INTO users (username, email, password, first_name, last_name, address) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
          username,
          email,
          hashedPassword,
          first_name,
          last_name,
          address,
        ];

        pool
          .execute(insertUserQuery, values)
          .then(() => {
            res.status(201).json({ message: "Registration successful" });
          })
          .catch((err) => {
            console.error("MySQL error:", err);
            return res.status(500).json({ message: "Internal server error" });
          });
      });
    })
    .catch((err) => {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Endpoint for user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are mandatory" });
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  pool
    .execute("SELECT * FROM users WHERE username = ?", [username])
    .then(([results]) => {
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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "6h",
        });
        const secret = uuid.v4();

        // Store the token and secret in the database
        const storeTokenQuery =
          "INSERT INTO user_tokens (user_id, token, secret) VALUES (?, ?, ?)";
        pool
          .execute(storeTokenQuery, [user.id, token, secret])
          .then(() => {
            res.status(200).json({ message: "Login successful", token });
          })
          .catch((err) => {
            console.error("MySQL error:", err);
            return res.status(500).json({ message: "Internal server error" });
          });
      });
    })
    .catch((err) => {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Endpoint for user logout
router.post("/logout", (req, res) => {
  // Get the user's token and secret from the session
  const { token, secret } = req.session.user;
  const deleteTokenQuery =
    "DELETE FROM user_tokens WHERE token = ? AND secret = ?";
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  pool
    .execute(deleteTokenQuery, [token, secret])
    .then(() => {
      // Clear the user session
      req.session.destroy();
      res.status(200).json({ message: "Logout successful" });
    })
    .catch((err) => {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
