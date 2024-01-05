// app.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

require("dotenv").config({
  path: "C:\\Users\\AlfaGongGong\\Hakaton\\github repos\\zavrsenko\\.env",
});
const port = process.env.PORT;
// Middleware
app.use(cors());
app.use(express.json());

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

// Routes
const gamesRouter = require("./js/routes/gamesRoutes");
const dealsRouter = require("./js/routes/dealsRoutes");
const gamingGearRouter = require("./js/routes/gamingGearRoutes");
const upcomingRouter = require("./js/routes/upcomingRoutes");
const freeRouter = require("./js/routes/freeGamesRoutes");
const router = require("./js/routes/userRoutes");

app.use("/games", gamesRouter);
// use games route to get all games

app.use("/games/:id", gamesRouter);
// use id route to get a specific game by game id

app.use("/games/genre", gamesRouter);
// use genre route to get all games by genre

app.use("/deals", dealsRouter);
// use deals route to get all deals
app.use("/gaming_gear", gamingGearRouter);
// use gaming gear route to get all gaming gear
app.use("/api", upcomingRouter);
// use upcoming route to get all upcoming games
app.use("/api", freeRouter);
// use free games route to get all free games
app.use("/user", router);
// use user route to get all users

// Connect to the database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database:", dbConfig.database);

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port} ... `);
  });
});
