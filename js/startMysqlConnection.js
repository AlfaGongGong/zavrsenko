const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'gg_database',
      port: 3306,
});

// Connect to the database
db.connect((err) => {
      if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
      }
      console.log('Connected to MySQL');
});

app.get('/deals', (req, res) => {
      db.query('SELECT * FROM deals ORDER BY RAND() DESC LIMIT 6;', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }

            res.json(results);
      });
});

app.get('/games', (req, res) => {
      db.query('SELECT * FROM games ORDER BY RAND() DESC LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });
});

app.get('/gaming_accessories', (req, res) => {
      db.query('SELECT * FROM gaming_accessories ORDER BY RAND() LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });
});

app.get('/upcoming_games', (req, res) => {
      db.query('SELECT * FROM upcoming_games ORDER BY RAND() LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });
});

app.get('/free_games', (req, res) => {
      db.query('SELECT * FROM free_games ORDER BY RAND() LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });

});

app.listen(3000, () => {
      console.log('Server running on port 3000');
});
