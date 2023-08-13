const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3306;
const config = require('./config');

const connection = mysql.createConnection(config);

app.use(express.static('public'));

app.get('/get_games', (req, res) => {
      connection.query('SELECT * FROM products_games ORDER BY times_purchased DESC LIMIT 6', (err, results) => {
            if (err) {
                  throw err;
            }

            res.json(results);
      });
});

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});