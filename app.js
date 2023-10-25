// app.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
require("dotenv").config({ path: "zavrsenko/.env" });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
};

// Routes
const gamesRouter = require("./js/routes/gamesRoutes");
const dealsRouter = require("./js/routes/dealsRoutes");
const gamingGearRouter = require("./js/routes/gamingGearRoutes");
const upcomingRouter = require("./js/routes/upcomingRoutes");
const freeRouter = require("./js/routes/freeGamesRoutes");
const userRouter = require("./js/routes/usersRoutes");

// Allow POST requests and set response format to JSON for each route
gamesRouter.post("/", (req, res) => {
  res.status(200).json({ message: "POST request successful" });
});
dealsRouter.post("/", (req, res) => {
  res.status(200).json({ message: "POST request successful" });
});
gamingGearRouter.post("/", (req, res) => {
  res.status(200).json({ message: "POST request successful" });
});
upcomingRouter.post("/", (req, res) => {
  res.status(200).json({ message: "POST request successful" });
});
freeRouter.post("/", (req, res) => {
  res.status(200).json({ message: "POST request successful" });
});
userRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password using bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    // Insert the user's information into the database
    const connection = mysql.createConnection(dbConfig);
    connection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into database:", error);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        res.status(200).json({ message: "Registration successful" });
      }
    );
  });
});
userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the user's username and password match the records in the database
  const connection = mysql.createConnection(dbConfig);
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error selecting user from database:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        if (result) {
          // Set a session cookie with the user's information
          req.session.user = {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
          };

          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid username or password" });
        }
      });
    }
  );
});
userRouter.post("/logout", (req, res) => {
  // Clear the session cookie
  req.session.destroy((err) => {
    if (err) {
      console.error("Error clearing session cookie:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.status(200).json({ message: "Logout successful" });
  });
});

app.use("/games", gamesRouter);
app.use("/deals", dealsRouter);
app.use("/gaming_gear", gamingGearRouter);
app.use("/api", upcomingRouter);
app.use("/api/users", userRouter);
app.use("/api", freeRouter);

// Connect to the database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database:", dbConfig.database);

  // Start the server
  app.listen(8080, () => {
    console.log(`Server running on port 8080`);
  });
});

app.use((req, res, next) => {
  if (req.session.user) {
    // User is logged in
    res.locals.loggedIn = true;
    res.locals.username = req.session.user.username.trim();
  } else {
    // User is not logged in
    res.locals.loggedIn = false;
  }
  next();
});
