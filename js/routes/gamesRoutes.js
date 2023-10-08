const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get all games
router.get("/", (req, res) => {
  db.query("SELECT * FROM games", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching games from the database");
      return;
    }

    res.json(results);
  });
});

// Route to get a specific game by ID
router.get("/:id", (req, res) => {
  const gameId = req.params.id;
  db.query("SELECT * FROM games WHERE id = ?", [gameId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching game details from the database");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Game not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Route to create a new game (you may need to add authentication and authorization)
router.post("/", (req, res) => {
  const { title, description, platform } = req.body;
  // Add your validation and database insertion code here
  // ...

  // Send a response indicating success or failure
  res.status(201).send("Game created successfully");
});

// Route to update a game by ID (you may need to add authentication and authorization)
router.put("/:id", (req, res) => {
  const gameId = req.params.id;
  // Add your validation and database update code here
  // ...

  // Send a response indicating success or failure
  res.status(200).send("Game updated successfully");
});

// Route to delete a game by ID (you may need to add authentication and authorization)
router.delete("/:id", (req, res) => {
  const gameId = req.params.id;
  // Add your validation and database deletion code here
  // ...

  // Send a response indicating success or failure
  res.status(204).send();
});

module.exports = router;
