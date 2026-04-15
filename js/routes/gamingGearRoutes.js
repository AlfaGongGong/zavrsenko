const mysql = require("mysql2/promise");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "./.env" });

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);
const gamingGearRouter = require("express").Router();

gamingGearRouter.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM gaming_gear");
    res.json(results);
  } catch (error) {
    console.error("Error fetching gear:", error);
    res.status(500).json({ error: "Error fetching gear" });
  }
});

gamingGearRouter.get("/:id", async (req, res) => {
  const gearId = req.params.id;

  try {
    const [results] = await pool.query("SELECT * FROM gaming_gear WHERE id = ?", [gearId]);
    const gear = results[0];
    if (!gear) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(gear);
  } catch (error) {
    console.error("Error fetching gear item:", error);
    res.status(500).json({ error: "Error fetching gear item" });
  }
});

// Admin — create, update, delete

gamingGearRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO gaming_gear (name, description, price) VALUES (?, ?, ?)",
      [name, description, price],
    );
    connection.release();
    res.status(201).json({ message: "Gaming gear item created successfully" });
  } catch (error) {
    console.error("Error creating gear item:", error);
    res.status(500).json({ error: "Error creating gaming gear item" });
  }
});

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
      [name, description, price, gearId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Gaming gear item not found" });
    }
    res.status(200).json({ message: "Gaming gear item updated successfully" });
  } catch (error) {
    console.error("Error updating gear item:", error);
    res.status(500).json({ error: "Error updating gaming gear item" });
  }
});

gamingGearRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const gearId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM gaming_gear WHERE id = ?",
      [gearId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Gaming gear item not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting gear item:", error);
    res.status(500).json({ error: "Error deleting gaming gear item" });
  }
});

module.exports = gamingGearRouter;
