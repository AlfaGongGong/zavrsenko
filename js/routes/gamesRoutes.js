const express = require("express");
const gamesRouter = express.Router();
const mysql = require("mysql2");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");

// Database connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "gg_database",
  port: 3306,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// get all games
gamesRouter.get("/", (req, res) => {
  // Use the pool to query the database
  pool.query("SELECT * FROM games", (error, results) => {
    if (error) {
      console.error("Error fetching games from the database:", error);
      res.status(500).json({ error: "Error fetching games from the database" });
    } else {
      res.json(results);
    }
  });
});

// get a specific game by ID
gamesRouter.get("/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const response = await axios.get(`http://localhost:8080/games/${gameId}`);
    const game = response.data;

    if (!game) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json(game);
    }
  } catch (error) {
    console.error("Error fetching game details from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching game details from the database" });
  }
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
    const response = await axios.post("http://localhost:8080/games", {
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
    const response = await axios.put(`http://localhost:8080/games/${gameId}`, {
      title,
      description,
      platform,
    });

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
      `http://localhost:8080/games/${gameId}`
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
