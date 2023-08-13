const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3306;

// Create MySQL connection
const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'admin',
      password: 'admin',
      database: 'gg_database'
});

// Connect to MySQL
connection.connect(err => {
      if (err) throw err;
      console.log('Connected to MySQL');
});

// Serve static files (e.g., index.html, styles.css, script.js)
app.use(express.static('public'));

// Fetch game data from database
app.get('/games', (req, res) => {
      const query = 'SELECT * FROM product_name ORDER BY times_purchased DESC LIMIT 6';
      connection.query(query, (err, result) => {
            if (err) throw err;
            res.json(result);
      });
});

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});