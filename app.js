const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database create connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "gg_database",
  port: 3306,
};

// Routes
const gamesRouter = require("./js/routes/gamesRoutes");

app.use("/games", gamesRouter);

// Connect to the database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database:", dbConfig.database);
  app.listen(8080, () => {
    console.log(`Server running on port 8080`);
  });
});
