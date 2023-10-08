const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching users from the database");
      return;
    }

    res.json(results);
  });
});

// Route to get a specific user by ID
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching user details from the database");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Route to create a new user (you may need to add authentication and authorization)
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  // Add your validation and database insertion code here
  // ...

  // Send a response indicating success or failure
  res.status(201).send("User created successfully");
});

// Route to update a user by ID (you may need to add authentication and authorization)
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  // Add your validation and database update code here
  // ...

  // Send a response indicating success or failure
  res.status(200).send("User updated successfully");
});

// Route to delete a user by ID (you may need to add authentication and authorization)
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  // Add your validation and database deletion code here
  // ...

  // Send a response indicating success or failure
  res.status(204).send();
});

module.exports = router;
