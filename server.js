
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
// Create MySQL connection
const connection = mysql.createConnection({
      host: 'localhost',
      user: 'admin',
      password: 'admin',
      database: 'gg_database'
});

// Connect

connection.connect(err => {
      if (err) throw err;
      console.log('Connected to MySQL');
});

app.use(express.static('public'));

app.get('/products_games', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const query = 'SELECT * FROM products_games ORDER BY times_purchased DESC LIMIT 6';
      connection.query(query, (err, result) => {
            if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
            }
            console.log('Fetched data:', result);
            res.json(result);
      });
});

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});