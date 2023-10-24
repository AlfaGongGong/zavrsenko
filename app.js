const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "zavrsenko/.env" });
app.use(bodyParser.json());
app.use(cors());

// Database create connection
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

app.use("/games", gamesRouter);

app.use("/deals", dealsRouter);

app.use("/gaming_gear", gamingGearRouter);

app.use("/api", upcomingRouter);

app.use("/api", freeRouter);
// Connect to the database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database:", dbConfig.database);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
