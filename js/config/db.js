const mysql = require("mysql2");
require("dotenv").config({ path: "./.env" });

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const db = mysql.createPool(dbConfig);

module.exports = db;
