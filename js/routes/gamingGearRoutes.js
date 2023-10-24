const mysql = require("mysql2/promise"); // fix 1
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "zavrsenko/.env" });

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

const gamingGearRouter = require("express").Router();

// get all gaming gear items
gamingGearRouter.get("/", async (req, res) => {
  try {
    // Use the pool to query the database
    const [results] = await pool.query("SELECT * FROM gaming_gear");
    res.json(results);
  } catch (error) {
    console.error("Error fetching gear from the database:", error);
    res.status(500).json({ error: "Error fetching gear from the database" });
  }
});

// get a specific gaming gear item by ID
gamingGearRouter.get("/:id", async (req, res) => {
  const gearId = req.params.id;

  try {
    const [results] = await pool.query(
      "SELECT * FROM gaming_gear WHERE id = ?",
      [gearId]
    );
    const gear = results[0]; // fix 5
    if (!gear) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(gear);
    }
  } catch (error) {
    console.error("Error fetching item details from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching item details from the database" });
  }
});

// Admin routes

// Create a new gaming gear item
gamingGearRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO gaming_gear (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );
    connection.release();
    res.status(201).json({ message: "Gaming gear item created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating gaming gear item" });
  }
});

// Update a gaming gear item by ID
gamingGearRouter.put("/:id", authenticate, isAdmin, async (req, res) => {
  const gearId = req.params.id;
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE gaming_gear SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, gearId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Gaming gear item not found" });
    } else {
      res
        .status(200)
        .json({ message: "Gaming gear item updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating gaming gear item" });
  }
});

// Delete a gaming gear item by ID
gamingGearRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const gearId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM gaming_gear WHERE id = ?",
      [gearId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Gaming gear item not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error deleting gaming gear item" });
  }
});

module.exports = gamingGearRouter;
