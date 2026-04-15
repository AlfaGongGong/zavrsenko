const express = require("express");
const gamesRouter = express.Router();
const mysql = require("mysql2/promise");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "./.env" });

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);

gamesRouter.get("/", authenticate, async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM games");
    res.json(results);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

gamesRouter.get("/:id", authenticate, async (req, res) => {
  const gameId = Number(req.params.id);

  if (!Number.isInteger(gameId)) {
    return res.status(400).json({ error: "Invalid game ID" });
  }

  try {
    const [results] = await pool.query("SELECT * FROM games WHERE id = ?", [gameId]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

gamesRouter.get("/genre/:genre", authenticate, async (req, res) => {
  const genre = req.params.genre;

  if (typeof genre !== "string") {
    return res.status(400).json({ error: "Invalid genre" });
  }

  try {
    const [results] = await pool.query("SELECT * FROM games WHERE genre = ?", [genre]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Games not found" });
    }
    res.json(results);
  } catch (error) {
    console.error("Error fetching games by genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

gamesRouter.post("/search", authenticate, async (req, res) => {
  const searchTerm = req.body.searchTerm;

  if (typeof searchTerm !== "string" || searchTerm.trim().length === 0) {
    return res.status(400).json({ error: "Invalid search term" });
  }

  try {
    const [results] = await pool.query(
      "SELECT * FROM games WHERE name LIKE ?",
      [`%${searchTerm}%`],
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "No games found" });
    }
    res.json(results);
  } catch (error) {
    console.error("Error searching games:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin — create, update, delete

gamesRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { title, description, platform } = req.body;

  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO games (title, description, platform) VALUES (?, ?, ?)",
      [title, description, platform],
    );
    connection.release();
    res.status(201).json({ message: "Game created successfully" });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Error creating the game" });
  }
});

gamesRouter.put("/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;
  const { title, description, platform } = req.body;

  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE games SET title = ?, description = ?, platform = ? WHERE id = ?",
      [title, description, platform, gameId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ error: "Error updating the game" });
  }
});

gamesRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("DELETE FROM games WHERE id = ?", [gameId]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ error: "Error deleting the game" });
  }
});

module.exports = gamesRouter;
