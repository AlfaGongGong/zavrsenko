const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
      session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
      })
);

const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'gg_database',
      port: 3306,
});

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

app.use(express.static('public'));

// Check user login status
app.get('/checkloginstatus', (req, res) => {
      if (req.session.user) {
            res.json({ loggedIn: true, username: req.session.user.username });
      } else {
            res.json({ loggedIn: false });
      }
});

// User registration endpoint
app.post('/register', (req, res) => {
      const { username, email, password } = req.body;
      // Check if the username or email is already registered
      const checkDuplicateUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
      db.query(checkDuplicateUserQuery, [username, email], (err, results) => {
            if (err) {
                  console.error('MySQL error:', err);
                  return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length > 0) {
                  return res.status(400).json({ message: 'Username or email already exists' });
            }
            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                  if (err) {
                        console.error('Error hashing password:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                  }
                  // Insert the new user into the database
                  const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                  db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
                        if (err) {
                              console.error('MySQL error:', err);
                              return res.status(500).json({ message: 'Internal server error' });
                        }
                        // Set user session
                        req.session.user = { username, email };
                        res.status(201).json({ message: 'Registration successful' });
                  });
            });
      });
});

// User login endpoint
app.post('/login', (req, res) => {
      const { username, password } = req.body;
      // Retrieve user data by username
      const getUserQuery = 'SELECT * FROM users WHERE username = ?';
      db.query(getUserQuery, [username], (err, results) => {
            if (err) {
                  console.error('MySQL error:', err);
                  return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length === 0) {
                  return res.status(401).json({ message: 'Invalid credentials' });
            }
            const user = results[0];
            // Compare the hashed password
            bcrypt.compare(password, user.password, (err, result) => {
                  if (err || !result) {
                        return res.status(401).json({ message: 'Invalid credentials' });
                  }
                  // Set user session
                  req.session.user = { username, email: user.email };
                  res.json({ message: 'Login successful' });
            });
      });
});

// Logout endpoint
app.post('/logout', (req, res) => {
      req.session.destroy();
      res.json({ message: 'Logout successful' });
});

const port = 3000;

app.listen(port, () => {
      console.log('Server running on port 3000');
});
