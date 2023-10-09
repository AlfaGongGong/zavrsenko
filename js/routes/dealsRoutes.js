const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("../config/config");
const db = require("../config/db");
const { secret } = require("../controllers/adminAuthController");

// Get all deals
router.get("/", (req, res) => {
  db.query("SELECT * FROM deals", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching deals from the database");
      return;
    }

    res.json(results);
  });
});

// Get a specific deal by ID
router.get("/:id", (req, res) => {
  const dealId = req.params.id;
  db.query("SELECT * FROM deals WHERE id = ?", [dealId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching deal details from the database");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Deal not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Admin routes

// Create a new deal
router.post("/", (req, res) => {
  const { title, salePrice, normalPrice, releaseDate, score, image } = req.body;

  // Check if the user has the necessary permissions
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed. Invalid token." });
    }

    // Check if the authenticated user is an admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized. Admin privileges required." });
    }

    // Add your validation code here
    if (
      !title ||
      !salePrice ||
      !normalPrice ||
      !releaseDate ||
      !score ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Add your database insertion code here
    const insertDealQuery = `
      INSERT INTO deals (title, salePrice, normalPrice, releaseDate, score, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertDealQuery,
      [title, salePrice, normalPrice, releaseDate, score, image],
      (err) => {
        if (err) {
          console.error("MySQL error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(201).json({ message: "Deal created successfully" });
      }
    );
  });
});

// Update a deal by ID
router.put("/:id", (req, res) => {
  const dealId = req.params.id; // Get the deal ID from the URL
  const { title, salePrice, normalPrice, releaseDate, score, image } = req.body;

  // Check if the user has the necessary permissions
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed. Invalid token." });
    }

    // Check if the authenticated user is an admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized. Admin privileges required." });
    }

    // Validation
    if (
      !title ||
      !salePrice ||
      !normalPrice ||
      !releaseDate ||
      !score ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update the deal in the database
    const updateDealQuery = `
      UPDATE deals
      SET title = ?, salePrice = ?, normalPrice = ?, releaseDate = ?, score = ?, image = ?
      WHERE id = ?
    `;

    db.query(
      updateDealQuery,
      [title, salePrice, normalPrice, releaseDate, score, image, dealId], // Use dealId
      (err, result) => {
        if (err) {
          console.error("MySQL error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Deal not found" });
        }

        res.status(200).json({ message: "Deal updated successfully" });
      }
    );
  });
});

// Delete a deal by ID
router.delete("/:id", (req, res) => {
  const dealId = req.params.id; // Get the deal ID from the URL

  // Check if the user has the necessary permissions
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed. Invalid token." });
    }

    // Check if the authenticated user is an admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized. Admin privileges required." });
    }

    // Delete the deal from the database
    const deleteDealQuery = "DELETE FROM deals WHERE id = ?";

    db.query(deleteDealQuery, [dealId], (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Deal not found" });
      }

      res.status(200).json({ message: "Deal deleted successfully" });
    });
  });
});

module.exports = router;
