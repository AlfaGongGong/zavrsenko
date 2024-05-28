const mysql = require("mysql2/promise");
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

const upcomingRouter = require("express").Router();

//  get all upcoming items
upcomingRouter.get("/upcoming", async (req, res) => {
  try {
    // Use the pool to query the database
    const [results] = await pool.query("SELECT * FROM upcoming");
    res.json(results);
  } catch (error) {
    console.error("Error fetching game from the database:", error);
    res.status(500).json({ error: "Error fetching game from the database" });
  }
});

//  get a specific upcoming item by ID
upcomingRouter.get("/upcoming/:id", async (req, res) => {
  const upcomingId = req.params.id;

  try {
    const [results] = await pool.query("SELECT * FROM upcoming WHERE id = ?", [
      upcomingId,
    ]);
    const upcoming = results[0];
    if (!upcoming) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(upcoming);
    }
  } catch (error) {
    console.error("Error fetching item details from the database:", error);
    res
      .status(500)
      .json({ error: "Error fetching item details from the database" });
  }
});

// Admin routes

// Create a new upcoming item
upcomingRouter.post("/upcoming", authenticate, isAdmin, async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO upcoming (title, description, start_date, end_date) VALUES (?, ?, ?, ?)",
      [title, description, startDate, endDate],
    );
    connection.release();
    res.status(201).json({ message: "Upcoming item created successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error creating upcoming item" });
  }
});

// Update an upcoming item by ID
upcomingRouter.put("/upcoming/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE upcoming SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?",
      [title, description, startDate, endDate, itemId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Upcoming item not found" });
    } else {
      res.status(200).json({ message: "Upcoming item updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Error updating upcoming item" });
  }
});

// Delete an upcoming item by ID
upcomingRouter.delete(
  "/upcoming/:id",
  authenticate,
  isAdmin,
  async (req, res) => {
    const itemId = req.params.id;

    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        "DELETE FROM upcoming WHERE id = ?",
        [itemId],
      );
      connection.release();

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Upcoming item not found" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Error deleting upcoming item" });
    }
  },
);

module.exports = upcomingRouter;
