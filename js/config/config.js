 require("dotenv").config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
  RAPID_API_KEY,
  RAWG_API_KEY,
  SESSION_SECRET,
  CORS_ALLOWED_ORIGINS,
} = process.env;

module.exports = {
  // Database configuration
  database: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    databaseName: DB_NAME,
    port: DB_PORT,
  },

  // Express server port
  server: {
    port: PORT,
  },

  // API keys
  apiKeys: {
    rapidApiKey: RAPID_API_KEY,
    rawgApiKey: RAWG_API_KEY,
  },

  // Session configuration
  session: {
    secret: SESSION_SECRET,
  },

  // CORS configuration
  cors: {
    allowedOrigins: [CORS_ALLOWED_ORIGINS],
  },
};

