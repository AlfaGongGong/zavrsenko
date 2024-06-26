const express = require("express");
const gamesRouter = express.Router();
const mysql = require("mysql2");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// get all games
gamesRouter.get("/", authenticate, (req, res) => {
  // Use the pool to query the database
  pool.query("SELECT * FROM games", (error, results) => {
    if (error) {
      console.error("Error fetching games from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// get a specific game by game id
gamesRouter.get("/:id", authenticate, (req, res) => {
  const gameId = Number(req.params.id);

  if (!Number.isInteger(gameId)) {
    return res.status(400).json({ error: "Invalid game ID" });
  }

  // Use the pool to query the database
  pool.query("SELECT * FROM games WHERE id = ?", [gameId], (error, results) => {
    if (error) {
      console.error("Error fetching game from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// get all games by genre
gamesRouter.get("/genre/:genre", authenticate, (req, res) => {
  const genre = req.params.genre;

  if (typeof genre !== "string") {
    return res.status(400).json({ error: "Invalid genre" });
  }

  // Use the pool to query the database
  pool.query(
    "SELECT * FROM games WHERE genre = ?",
    [genre],
    (error, results) => {
      if (error) {
        console.error("Error fetching games from the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Games not found" });
      } else {
        res.json(results);
      }
    },
  );
});

// Search for games
gamesRouter.post("/search", authenticate, (req, res) => {
  const searchTerm = req.body.searchTerm;

  if (typeof searchTerm !== "string" || searchTerm.trim().length === 0) {
    return res.status(400).json({ error: "Invalid search term" });
  }

  // Use the pool to query the database
  pool.query(
    "SELECT * FROM games WHERE name LIKE ?",
    [`%${searchTerm}%`],
    (error, results) => {
      if (error) {
        console.error("Error fetching games from the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "No games found" });
      } else {
        res.json(results);
      }
    },
  );
});

// Admin routes

// Create a new game
gamesRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { title, description, platform } = req.body;

  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    //  POST request to create a new game
    const response = await axios.post("http://localhost:${PORT}/games", {
      title,
      description,
      platform,
    });

    res.status(201).json({ message: "Game created successfully" });
  } catch (error) {
    console.error("Error creating the game:", error);
    res.status(500).json({ error: "Error creating the game" });
  }
});

// Update a game by ID
gamesRouter.put("/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;
  const { title, description, platform } = req.body;

  if (!title || !description || !platform) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // PUT request to update the game by ID
    const response = await axios.put(
      `http://localhost:${PORT}/games/${gameId}`,
      {
        title,
        description,
        platform,
      },
    );

    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating the game:", error);
    res.status(500).json({ error: "Error updating the game" });
  }
});

// Delete a game by ID
gamesRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const gameId = req.params.id;

  try {
    // DELETE request to delete the game by ID
    const response = await axios.delete(
      `http://localhost:${PORT}/games/${gameId}`,
    );

    if (response.status === 204) {
      res.status(204).send();
    } else if (response.status === 404) {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error("Error deleting the game:", error);
    res.status(500).json({ error: "Error deleting the game" });
  }
});

module.exports = gamesRouter;
