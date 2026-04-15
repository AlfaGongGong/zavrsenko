const express = require("express");
const dealsRouter = express.Router();
const mysql = require("mysql2/promise");
const axios = require("axios");
const authenticate = require("../authentication/authToken");
const isAdmin = require("../authentication/isAdmin");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT;

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);

dealsRouter.get("/", (req, res) => {
  pool.query("SELECT * FROM deals", (error, results) => {
    if (error) {
      console.error("Error fetching deals:", error);
      return res.status(500).json({ error: "Error fetching deals" });
    }
    res.json(results);
  });
});

dealsRouter.get("/:id", async (req, res) => {
  const dealId = Number(req.params.id);

  // Reject non-integer IDs to prevent SSRF via URL injection
  if (!Number.isInteger(dealId) || dealId <= 0) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }

  try {
    const response = await axios.get(`http://localhost:${PORT}/games/${dealId}`);
    const deal = response.data;
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ error: "Error fetching deal" });
  }
});

// Admin — create, update, delete

dealsRouter.post("/", authenticate, isAdmin, async (req, res) => {
  const { title, description, price, discount } = req.body;

  if (!title || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO deals (title, description, price, discount) VALUES (?, ?, ?, ?)",
      [title, description, price, discount],
    );
    connection.release();
    res.status(201).json({ message: "Deal created successfully" });
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ error: "Error creating the deal" });
  }
});

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
      [title, description, price, discount, dealId],
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(200).json({ message: "Deal updated successfully" });
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ error: "Error updating the deal" });
  }
});

dealsRouter.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const dealId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("DELETE FROM deals WHERE id = ?", [dealId]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ error: "Error deleting the deal" });
  }
});

module.exports = dealsRouter;
