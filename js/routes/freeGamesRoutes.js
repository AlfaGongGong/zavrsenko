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

//  get all free games
router.get("/free_games", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM free_games");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res
      .status(500)
      .json({ error: "Error fetching free games from the database" });
  }
});

//  get a specific free game by ID
router.get("/free_games/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM free_games WHERE id = ?",
      [gameId]
    );
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Free game not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res
      .status(500)
      .json({ error: "Error fetching free game details from the database" });
  }
});

// Admin routes

// Create a new free game
router.post("/free_games", authenticate, isAdmin, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO free_games (title, description) VALUES (?, ?)",
      [title, description]
    );
    connection.release();
    res.status(201).json({ message: "Free game created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating free game" });
  }
});

// Update a free game by ID
router.put("/free_games/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE free_games SET title = ?, description = ? WHERE id = ?",
      [title, description, gameId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Free game not found" });
    } else {
      res.status(200).json({ message: "Free game updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating free game" });
  }
});

// Delete a free game by ID
router.delete("/free_games/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM free_games WHERE id = ?",
      [gameId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Free game not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting free game" });
  }
});

module.exports = router;
