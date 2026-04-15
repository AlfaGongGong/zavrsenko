const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../authentication/authToken");
require("dotenv").config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      (error) => {
        if (error) {
          console.error("Error inserting user:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Registration successful" });
      },
    );
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (!match) {
          return res.status(401).json({ message: "Invalid username or password" });
        }

                const token = jwt.sign(
          {
            id: results[0].id,
            username: results[0].username,
            email: results[0].email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );

        res.status(200).json({ token });
      });
    },
  );
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

router.post("/changePassword", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    pool.query(
      "UPDATE users SET password = ? WHERE username = ?",
      [hash, username],
      (error) => {
        if (error) {
          console.error("Error updating password:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Password changed successfully" });
      },
    );
  });
});

router.post("/changeEmail", (req, res) => {
  const { username, email } = req.body;

  pool.query(
    "UPDATE users SET email = ? WHERE username = ?",
    [email, username],
    (error) => {
      if (error) {
        console.error("Error updating email:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Email changed successfully" });
    },
  );
});

router.post("/changeAddress", (req, res) => {
  const { username, address } = req.body;

  pool.query(
    "UPDATE users SET address = ? WHERE username = ?",
    [address, username],
    (error) => {
      if (error) {
        console.error("Error updating address:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Address changed successfully" });
    },
  );
});

router.post("/changeFirstName", (req, res) => {
  const { username, first_name } = req.body;

  pool.query(
    "UPDATE users SET first_name = ? WHERE username = ?",
    [first_name, username],
    (error) => {
      if (error) {
        console.error("Error updating first name:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "First name changed successfully" });
    },
  );
});

router.post("/changeLastName", (req, res) => {
  const { username, last_name } = req.body;

  pool.query(
    "UPDATE users SET last_name = ? WHERE username = ?",
    [last_name, username],
    (error) => {
      if (error) {
        console.error("Error updating last name:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Last name changed successfully" });
    },
  );
});

router.get("/me", authenticate, (req, res) => {
  pool.query(
    "SELECT id, username, email, address, first_name, last_name FROM users WHERE id = ?",
    [req.user.id],
    (error, results) => {
      if (error) return res.status(500).json({ message: "Internal server error" });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    },
  );
});

module.exports = router;
