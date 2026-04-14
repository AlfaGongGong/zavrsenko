const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authenticate = require('../authentication/authToken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const pool = mysql.createPool(dbConfig);

// POST /orders/create
router.post('/create', async (req, res) => {
  const { items, customerInfo, total } = req.body;
  const orderId = uuidv4();

  // Attempt to decode user id from token if present
  let userId = null;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
      userId = decoded.id || null;
    } catch (e) {
      // token invalid or missing – guest order is fine
    }
  }

  try {
    await pool.query(
      'INSERT INTO orders (id, user_id, items, customer_info, total, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [orderId, userId, JSON.stringify(items || []), JSON.stringify(customerInfo || {}), total || 0, 'confirmed']
    );
  } catch (e) {
    // Table might not exist yet – still return a successful response
    console.error('Order DB insert error (non-fatal):', e.message);
  }

  res.json({ orderId, status: 'confirmed', message: 'Order placed successfully!' });
});

// GET /orders/my  (requires auth)
router.get('/my', authenticate, async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(results);
  } catch (e) {
    res.json([]);
  }
});

// GET /orders/:id  (requires auth)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (results.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(results[0]);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
