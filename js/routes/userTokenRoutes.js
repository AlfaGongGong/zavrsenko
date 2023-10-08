const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get all user tokens
router.get("/", (req, res) => {
  db.query("SELECT * FROM user_tokens", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching user tokens from the database");
      return;
    }

    res.json(results);
  });
});

// Route to get user tokens by user ID
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM user_tokens WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).send("Error fetching user tokens from the database");
        return;
      }

      res.json(results);
    }
  );
});

// Route to create a new user token (you may need to add authentication and authorization)
router.post("/", (req, res) => {
  const { user_id, token, secret } = req.body;
  // Add your validation and database insertion code here
  // ...

  // Send a response indicating success or failure
  res.status(201).send("User token created successfully");
});

// Route to delete a user token by ID (you may need to add authentication and authorization)
router.delete("/:id", (req, res) => {
  const tokenId = req.params.id;
  // Add your validation and database deletion code here
  // ...

  // Send a response indicating success or failure
  res.status(204).send();
});

module.exports = router;
