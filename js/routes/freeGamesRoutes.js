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
const freeRouter = require("express").Router();

freeRouter.get("/free_games", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM free_games");
    res.json(results);
  } catch (error) {
    console.error("Error fetching free games:", error);
    res.status(500).json({ error: "Error fetching free games" });
  }
});

freeRouter.get("/free_games/:id", async (req, res) => {
  const freeId = req.params.id;

  try {
    const [results] = await pool.query("SELECT * FROM free_games WHERE id = ?", [freeId]);
    const free = results[0];
    if (!free) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(free);
  } catch (error) {
    console.error("Error fetching free game:", error);
    res.status(500).json({ error: "Error fetching free game" });
  }
});

// Admin — create, update, delete

freeRouter.post("/free_games", authenticate, isAdmin, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO free_games (title, description) VALUES (?, ?)",
      [title, description],
    );
    connection.release();
    res.status(201).json({ message: "Free game created successfully" });
  } catch (error) {
    console.error("Error creating free game:", error);
    res.status(500).json({ error: "Error creating free game" });
  }
});

freeRouter.put("/free_games/:id", authenticate, isAdmin, async (req, res) => {
  const freeId = req.params.id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE free_games SET title = ?, description = ? WHERE id = ?",
      [title, description, freeId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Free game not found" });
    }
    res.status(200).json({ message: "Free game updated successfully" });
  } catch (error) {
    console.error("Error updating free game:", error);
    res.status(500).json({ error: "Error updating free game" });
  }
});

freeRouter.delete("/free_games/:id", authenticate, isAdmin, async (req, res) => {
  const freeId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM free_games WHERE id = ?",
      [freeId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Free game not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting free game:", error);
    res.status(500).json({ error: "Error deleting free game" });
  }
});

module.exports = freeRouter;
