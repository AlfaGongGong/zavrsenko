const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.EXPRESS_SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Database connection pool
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Security Headers
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", process.env.CORS_ALLOWED_ORIGINS);
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
const authRoutes = require("./js/routes/usersRoutes");
const dealsRoutes = require("./js/routes/dealsRoutes");
const freeGamesRoutes = require("./js/routes/freeGamesRoutes");
const gamesRoutes = require("./js/routes/gamesRoutes");
const gamingGearRoutes = require("./js/routes/gamingGearRoutes");
const upcomingRoutes = require("./js/routes/upcomingRoutes");
const usersRoutes = require("./js/routes/usersRoutes");
const userTokensRoutes = require("./js/routes/userTokensRoutes");

app.use("/auth", authRoutes);
app.use("/deals", dealsRoutes);
app.use("/freeGames", freeGamesRoutes);
app.use("/games", gamesRoutes);
app.use("/gamingGear", gamingGearRoutes);
app.use("/upcoming", upcomingRoutes);
app.use("/users", usersRoutes);
app.use("/userTokens", userTokensRoutes);

// Error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  console.error(error);
});

// Database connection
connectionPool.on("connection", () => {
  console.log("Connected to the database");
});

connectionPool.on("error", (error) => {
  console.error("Error connecting to the database", error);
});
