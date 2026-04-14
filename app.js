// app.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();

require("dotenv").config({
  path: "./.env",
});
const port = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve only public-facing directories, not the entire working directory
app.use('/css',    express.static('css'));
app.use('/js',     express.static('js'));
app.use('/html',   express.static('html'));
app.use('/images', express.static('images'));
app.use(express.static('html')); // allow root access to html files
// Serve index.html at root
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many authentication attempts, please try again later." },
});

app.use(globalLimiter);

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
const userRouter = require("./js/routes/userRoutes");
const adminRouter = require("./js/routes/adminRoutes");
const authRouter = require("./js/routes/authRoutes");
const userTokenRouter = require("./js/routes/userTokenRoutes");
const orderRouter = require("./js/routes/orderRoutes");

app.use("/games", gamesRouter);
app.use("/deals", dealsRouter);
app.use("/gaming_gear", gamingGearRouter);
app.use("/api", upcomingRouter);
app.use("/api", freeRouter);
app.use("/user/login", authLimiter);
app.use("/user/register", authLimiter);
app.use("/user", userRouter);
app.use("/admin", authLimiter, adminRouter);
app.use("/auth", authLimiter, authRouter);
app.use("/user_tokens", userTokenRouter);
app.use("/orders", orderRouter);

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
