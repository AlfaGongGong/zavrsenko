const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

// Endpoint for user registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username, email, and password are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are mandatory." });
  }

  // Generate a unique secret
  const secret = uuid.v4();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a user
  const user = {
    username,
    email,
    password: hashedPassword,
    secret,
  };

  // Insert the new user into the database
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const [results] = await pool.query(
      "INSERT INTO users (username, email, password, secret) VALUES (?, ?, ?, ?)",
      [
        user.username,
        user.email,
        user.password,
        user.secret]
    );
    if (results.affectedRows > 0) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (err) {
    console.error("MySQL error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are mandatory." });
  }

  // Check if the username exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const [results] = await pool.query(checkUserQuery, [username]);
    if (results.length === 0) {
      return res.status(401).json({ message: "User login failed" });
    }
    const user = results[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User login failed" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, process.env.USER_JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({ message: "User login successful", token });
  } catch (err) {
    console.error("MySQL error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for user logout
router.post("/logout", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const deleteTokenQuery = "DELETE FROM users WHERE token = ?";
    await pool.query(deleteTokenQuery, [token]);

    res.status(200).json({ message: "User logout successful" });
  } catch (err) {
    console.error("MySQL error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
