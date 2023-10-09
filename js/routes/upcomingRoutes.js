const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all upcoming deals
router.get('/upcoming', (req, res) => {
  db.query('SELECT * FROM upcoming_deals', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error fetching upcoming deals from the database');
      return;
    }

    res.json(results);
  });
});

// Route to get a specific upcoming deal by ID
router.get('/upcoming/:id', (req, res) => {
  const dealId = req.params.id;
  db.query('SELECT * FROM upcoming_deals WHERE id = ?', [dealId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error fetching upcoming deal details from the database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Upcoming deal not found');
    } else {
      res.json(results[0]);
    }
  });
});

//Admin routes

// Create a new upcoming deal (you may need to add authentication and authorization)
router.post('/upcoming', (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  // Add your validation and database insertion code here
  // ...

  // Send a response indicating success or failure
  res.status(201).send('Upcoming deal created successfully');
});

// Update an upcoming deal by ID (you may need to add authentication and authorization)
router.put('/upcoming/:id', (req, res) => {
  const dealId = req.params.id;
  // Add your validation and database update code here
  // ...

  // Send a response indicating success or failure
  res.status(200).send('Upcoming deal updated successfully');
});

// Delete an upcoming deal by ID (you may need to add authentication and authorization)
router.delete('/upcoming/:id', (req, res) => {
  const dealId = req.params.id;
  // Add your validation and database deletion code here
  // ...

  // Send a response indicating success or failure
  res.status(204).send();
});

module.exports = router;
