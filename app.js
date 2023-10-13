const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const config = require("./js/config/config");

const PORT = config.server.port;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const dbConfig = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.databaseName, 
  port: config.database.port,
};

const connectionPool = mysql.createPool(dbConfig);

// Setting Permissions Policy header
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", process.env.GEOLOCATION);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
const authRoutes = require("./js/routes/authRoutes");
const dealsRoutes = require("./js/routes/dealsRoutes"); 
const freeGamesRoutes = require("./js/routes/freeGamesRoutes"); // Add missing dots before js
const gamesRoutes = require("./js/routes/gamesRoutes"); // Add missing dots before js
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
connectionPool.on("connection", (connection) => {
  console.log("Connected to database");
});

connectionPool.on("error", (error) => {
  console.error("Error connecting to database", error);
});
