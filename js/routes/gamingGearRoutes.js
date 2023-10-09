const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get all gaming gear items
router.get("/gaming_gear", (req, res) => {
  db.query("SELECT * FROM gaming_gear", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ error: "Error fetching gaming gear items from the database" });
      return;
    }

    res.json(results);
  });
});

// Route to get a specific gaming gear item by ID
router.get("/gaming_gear/:id", (req, res) => {
  const itemId = req.params.id;
  db.query(
    "SELECT * FROM gaming_gear WHERE id = ?",
    [itemId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({
          error: "Error fetching gaming gear item details from the database",
        });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Gaming gear item not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

// Admin routes

// Create a new gaming gear item (you may need to add authentication and authorization)
router.post("/gaming_gear", (req, res) => {
  const { name, description, price } = req.body;

  // Example validation: Ensure required fields are present
  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert the new gaming gear item into the database
  const insertQuery =
    "INSERT INTO gaming_gear (name, description, price) VALUES (?, ?, ?)";
  db.query(insertQuery, [name, description, price], (err) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error creating gaming gear item" });
      return;
    }

    res.status(201).json({ message: "Gaming gear item created successfully" });
  });
});

// Update a gaming gear item by ID (you may need to add authentication and authorization)
router.put("/gaming_gear/:id", (req, res) => {
  const itemId = req.params.id;
  const { name, description, price } = req.body;

  // Example validation: Ensure required fields are present
  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Update the gaming gear item in the database
  const updateQuery =
    "UPDATE gaming_gear SET name = ?, description = ?, price = ? WHERE id = ?";
  db.query(updateQuery, [name, description, price, itemId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error updating gaming gear item" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res
        .status(200)
        .json({ message: "Gaming gear item updated successfully" });
    }
  });
});

// Delete a gaming gear item by ID (you may need to add authentication and authorization)
router.delete("/gaming_gear/:id", (req, res) => {
  const itemId = req.params.id;

  // Delete the gaming gear item from the database
  const deleteQuery = "DELETE FROM gaming_gear WHERE id = ?";
  db.query(deleteQuery, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Error deleting gaming gear item" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
