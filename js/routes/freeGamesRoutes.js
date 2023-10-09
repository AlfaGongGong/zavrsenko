const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all free games
router.get("/free_games", (req, res) => {
  db.query("SELECT * FROM free_games", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ error: "Error fetching free games from the database" });
      return;
    }

    res.json(results);
  });
});

// Get a specific free game by ID
router.get("/free_games/:id", (req, res) => {
  const gameId = req.params.id;
  db.query(
    "SELECT * FROM free_games WHERE id = ?",
    [gameId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res
          .status(500)
          .json({
            error: "Error fetching free game details from the database",
          });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Free game not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

// Admin routes

// Create a new free game (you may need to add authentication and authorization)
router.post("/free_games", (req, res) => {
  const { title, description } = req.body;

  // Example validation: Ensure required fields are present
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert the new free game into the database
  const insertQuery =
    "INSERT INTO free_games (title, description) VALUES (?, ?)";
  db.query(insertQuery, [title, description], (err) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error creating free game" });
      return;
    }

    res.status(201).json({ message: "Free game created successfully" });
  });
});

// Update a free game by ID (you may need to add authentication and authorization)
router.put("/free_games/:id", (req, res) => {
  const gameId = req.params.id;
  const { title, description } = req.body;

  // Example validation: Ensure required fields are present
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Update the free game in the database
  const updateQuery =
    "UPDATE free_games SET title = ?, description = ? WHERE id = ?";
  db.query(updateQuery, [title, description, gameId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error updating free game" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Free game not found" });
    } else {
      res.status(200).json({ message: "Free game updated successfully" });
    }
  });
});

// Delete a free game by ID (you may need to add authentication and authorization)
router.delete("/free_games/:id", (req, res) => {
  const gameId = req.params.id;

  // Delete the free game from the database
  const deleteQuery = "DELETE FROM free_games WHERE id = ?";
  db.query(deleteQuery, [gameId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error deleting free game" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Free game not found" });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
