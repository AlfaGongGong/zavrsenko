const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config();

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

//  get all gaming gear items
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM gaming_gear");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res
      .status(500)
      .json({ error: "Error fetching gaming gear items from the database" });
  }
});

// get a specific gaming gear item by ID
router.get("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM gaming_gear WHERE id = ?",
      [itemId]
    );
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({
      error: "Error fetching gaming gear item details from the database",
    });
  }
});

// Admin routes

// Create a new gaming gear item
router.post("/", authenticate, isAdmin, async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO gaming_gear (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );
    connection.release();
    res.status(201).json({ message: "Gaming gear item created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating gaming gear item" });
  }
});

// Update a gaming gear item by ID
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const { name, description, price } = req.body;

  // Example validation: Ensure required fields are present
  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE gaming_gear SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, itemId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res
        .status(200)
        .json({ message: "Gaming gear item updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating gaming gear item" });
  }
});

// Delete a gaming gear item by ID
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM gaming_gear WHERE id = ?",
      [itemId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting gaming gear item" });
  }
});

module.exports = router;
