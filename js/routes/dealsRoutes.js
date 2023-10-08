const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get all deals
router.get("/", (req, res) => {
  db.query("SELECT * FROM deals", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching deals from the database");
      return;
    }

    res.json(results);
  });
});

// Route to get a specific deal by ID
router.get("/:id", (req, res) => {
  const dealId = req.params.id;
  db.query("SELECT * FROM deals WHERE id = ?", [dealId], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching deal details from the database");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Deal not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Route to create a new deal (you may need to add authentication and authorization)
router.post("/", (req, res) => {
  const { title, description, price } = req.body;
  // Add your validation and database insertion code here
  // ...

  // Send a response indicating success or failure
  res.status(201).send("Deal created successfully");
});

// Route to update a deal by ID (you may need to add authentication and authorization)
router.put("/:id", (req, res) => {
  const dealId = req.params.id;
  // Add your validation and database update code here
  // ...

  // Send a response indicating success or failure
  res.status(200).send("Deal updated successfully");
});

// Route to delete a deal by ID (you may need to add authentication and authorization)
router.delete("/:id", (req, res) => {
  const dealId = req.params.id;
  // Add your validation and database deletion code here
  // ...

  // Send a response indicating success or failure
  res.status(204).send();
});

module.exports = router;
