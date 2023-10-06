const { config } = require("dotenv");
config();

module.exports = {
    // Database configuration
    database: {
      host: 'localhost',          // Database host
      user: 'root',              // Database username
      password: 'root',          // Database password
      databaseName: 'gg_database',// Name of your MySQL database
      port: 3306                 // Database port
    },
  
    // Server configuration
    server: {
      port: 3000,                // Port on which your Node.js server will run
    },
  
    // API keys or other sensitive information
    apiKeys: {
      rapidApiKey: 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
      amazonScraperApiKey: 'YOUR_AMAZON_SCRAPER_API_KEY', // Replace with your Amazon Scraper API key
    },
  
    // Session configuration
    session: {
      secret: 'YOUR_SESSION_SECRET', // Replace with a secret key for session management
    },
  
    // CORS configuration
    cors: {
      allowedOrigins: ['http://localhost:8080'], // Replace with the origins you want to allow
    }
  };
  