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

//  get all upcoming items
router.get("/upcoming", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM upcoming");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res
      .status(500)
      .json({ error: "Error fetching upcoming items from the database" });
  }
});

//  get a specific upcoming item by ID
router.get("/upcoming/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM upcoming WHERE id = ?",
      [itemId]
    );
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Upcoming item not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({
      error: "Error fetching upcoming item details from the database",
    });
  }
});

// Admin routes

// Create a new upcoming item
router.post("/upcoming", authenticate, isAdmin, async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO upcoming (title, description, start_date, end_date) VALUES (?, ?, ?, ?)",
      [title, description, startDate, endDate]
    );
    connection.release();
    res.status(201).json({ message: "Upcoming item created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating upcoming item" });
  }
});

// Update an upcoming item by ID
router.put("/upcoming/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE upcoming SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?",
      [title, description, startDate, endDate, itemId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Upcoming item not found" });
    } else {
      res.status(200).json({ message: "Upcoming item updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating upcoming item" });
  }
});

// Delete an upcoming item by ID
router.delete("/upcoming/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM upcoming WHERE id = ?",
      [itemId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Upcoming item not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting upcoming item" });
  }
});

module.exports = router;

