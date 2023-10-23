const express = require("express");
const dealsRouter = express.Router();
const mysql = require("mysql2");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "zavrsenko/.env" });
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

//  get all deals
dealsRouter.get("/", (req, res) => {
// Use the pool to query the database
  pool.query("SELECT * FROM deals", (error, results) => {
    if (error) {
      console.error("Error fetching deals from the database:", error);
      res.status(500).json({ error: "Error fetching deals from the database" });
    } else {
      res.json(results);
    }
  });
});

//  get a specific deal by ID
dealsRouter.get("/:id", async (req, res) => {
  const dealId = req.params.id;

  try {
    const response = await axios.get(`http://localhost:${PORT}/games/${gameId}`
    );
    const deal = response.data;
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

// Create a new deal
dealsRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { title, description, price, discount } = req.body;

  if (!title || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO deals (title, description, price, discount) VALUES (?, ?, ?, ?)",
      [title, description, price, discount]
    );
    connection.release();
    res.status(201).json({ message: "Deal created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating the deal" });
  }
});

// Update a deal by ID
dealsRouter.put("/:id", authenticate, isAdmin, async (req, res) => {
  const dealId = req.params.id;
  const { title, description, price, discount } = req.body;

  if (!title || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE deals SET title = ?, description = ?, price = ?, discount = ? WHERE id = ?",
      [title, description, price, discount, dealId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.status(200).json({ message: "Deal updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating the deal" });
  }
});

// Delete a deal by ID
dealsRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const dealId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("DELETE FROM deals WHERE id = ?", [
      dealId,
    ]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting the deal" });
  }
});

module.exports = dealsRouter;
