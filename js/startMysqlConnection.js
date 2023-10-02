const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'None',
      secure: true,
    },
  })
);

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gg_database',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
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
      db.query('SELECT * FROM games ORDER BY metacritic DESC LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });
});

app.get('/gaming_gear', (req, res) => {
      db.query('SELECT * FROM gaming_gear ORDER BY RAND() LIMIT 6', (err, results) => {
            if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Error fetching data from the database');
                  return;
            }
            res.json(results);
      });
});

app.get('/upcoming', (req, res) => {
      db.query('SELECT * FROM upcoming ORDER BY RAND() LIMIT 6', (err, results) => {
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

// Endpoint for user registration
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
                  return res.status(409).json({ message: 'Username or email already registered' });
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

// Endpoint for user login
app.post('/login', (req, res) => {
      const { username, password } = req.body;

      // Check if the username exists in the database
      const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
      db.query(checkUserQuery, [username], (err, results) => {
            if (err) {
                  console.error('MySQL error:', err);
                  return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length === 0) {
                  return res.status(401).json({ message: 'Login failed' });
            }
            const user = results[0];

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, passwordMatch) => {
                  if (err) {
                        console.error('Error comparing passwords:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                  }
                  if (!passwordMatch) {
                        return res.status(401).json({ message: 'Login failed' });
                  }

                  // Set user session
                  req.session.user = { username: user.username, email: user.email };
                  res.status(200).json({ message: 'Login successful', token: 'your-auth-token' });
            });
      });
});

// Endpoint for checking user login status
app.get('/checkloginstatus', (req, res) => {
      if (req.session.user) {
            // User is logged in, send user data
            res.status(200).json({ loggedIn: true, username: req.session.user.username });
      } else {
            // User is not logged in
            res.status(401).json({ loggedIn: false });
      }
});

// Protected route
app.get('/protected', (req, res) => {
      if (req.session.user) {
            // User is authenticated, provide access to protected resource
            res.status(200).json({ message: 'Access granted to protected resource' });
      } else {
            // User is not authenticated
            res.status(401).json({ message: 'Access denied' });
      }
});

// Endpoint for user logout
app.post('/logout', (req, res) => {
      req.session.destroy();
      res.status(200).json({ message: 'Logout successful' });
});

// Endpoint for games details
app.get('/details/:id',
      (req, res) => {
            // Get game details
            const id = req.params.id;

            const getProductQuery = `SELECT * FROM games WHERE product_id = ?`;

            // Execute the query
            db.query(getProductQuery, [id], (err, results) => {
                  if (err) {
                        console.error('MySQL error:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                  }
                  if (results.length === 0) {
                        return res.status(404).json({ message: 'Product not found' });
                  }
                  res.json(results[0]);
            });
      });
      app.use(express.static('public'));

      // Setting Permissions Policy header
      app.use((req, res, next) => {
        res.setHeader('Permissions-Policy', 'geolocation=(self)');
        next();
      });
      
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
      
      
      
      
      
      
