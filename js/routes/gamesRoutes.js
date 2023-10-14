const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables from the provided .env file

// Create a MySQL pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Route to get all games
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM games");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error fetching games from the database" });
  }
});

// Route to get a specific game by ID
router.get("/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM games WHERE id = ?", [gameId]);
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error fetching game details from the database" });
  }
});

// Admin routes

// Create a new game (you may need to add authentication and authorization)
router.post("/", async (req, res) => {
  const { title, description, platform } = req.body;

  // Example validation: Ensure required fields are present
  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("INSERT INTO games (title, description, platform) VALUES (?, ?, ?)", [title, description, platform]);
    connection.release();
    res.status(201).json({ message: "Game created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating the game" });
  }
});

// Update a game by ID (you may need to add authentication and authorization)
router.put("/:id", async (req, res) => {
  const gameId = req.params.id;
  const { title, description, platform } = req.body;

  // Example validation: Ensure required fields are present
  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("UPDATE games SET title = ?, description = ?, platform = ? WHERE id = ?", [title, description, platform, gameId]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.status(200).json({ message: "Game updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating the game" });
  }
});

// Delete a game by ID (you may need to add authentication and authorization)
router.delete("/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("DELETE FROM games WHERE id = ?", [gameId]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting the game" });
  }
});

module.exports = router;
