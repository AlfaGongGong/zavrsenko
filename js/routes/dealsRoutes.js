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
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//  get all deals
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM deals");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error fetching deals from the database" });
  }
});

//  get a specific deal by ID
router.get("/:id", async (req, res) => {
  const dealId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM deals WHERE id = ?", [
      dealId,
    ]);
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res
      .status(500)
      .json({ error: "Error fetching deal details from the database" });
  }
});



// Admin routes

// Create a new deal
router.post("/", authenticate, isAdmin, async (req, res) => {
  const { title, description, price, discount } = req.body;

  if (!title || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO deals (title, description, price, discount) VALUES (?, ?, ?, ?)",
      [title, description, price, discount]
    );
    connection.release();
    res.status(201).json({ message: "Deal created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating the deal" });
  }
});

// Update a deal by ID
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  const dealId = req.params.id;
  const { title, description, price, discount } = req.body;

  if (!title || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE deals SET title = ?, description = ?, price = ?, discount = ? WHERE id = ?",
      [title, description, price, discount, dealId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.status(200).json({ message: "Deal updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating the deal" });
  }
});

// Delete a deal by ID
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const dealId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("DELETE FROM deals WHERE id = ?", [
      dealId,
    ]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting the deal" });
  }
});

module.exports = router;
