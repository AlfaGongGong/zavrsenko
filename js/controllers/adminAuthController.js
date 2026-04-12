const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);

// Register a new admin
const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    pool.query(
      "INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, 1)",
      [username, email, hash],
      (error) => {
        if (error) {
          console.error("Error inserting admin into the database:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Admin registration successful" });
      },
    );
  });
};

// Admin login
const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  pool.query(
    "SELECT * FROM users WHERE username = ? AND is_admin = 1",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error finding admin in the database:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials or not an admin" });
      }

      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (!match) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          {
            id: results[0].id,
            username: results[0].username,
            email: results[0].email,
            isAdmin: true,
          },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "1h" },
        );

        res.status(200).json({ token });
      });
    },
  );
};

// Admin logout
const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { register, login, logout };
