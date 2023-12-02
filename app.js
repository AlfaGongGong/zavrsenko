// app.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "zavrsenko/.env" });

// Middleware
app.use(cors());
app.use(express.json());

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
const router = require("./js/routes/userRoutes");

app.use("/games", gamesRouter);
app.use("/deals", dealsRouter);
app.use("/gaming_gear", gamingGearRouter);
app.use("/api", upcomingRouter);
app.use("/api", freeRouter);
app.use("/user", router);

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

