const { PORT, RAPID_API_KEY, RAWG_API_KEY, CORS_ALLOWED_ORIGINS } = process.env;

module.exports = {
  // Express server port
  server: {
    port: PORT,
  },

  // API keys
  apiKeys: {
    rapidApiKey: RAPID_API_KEY,
    rawgApiKey: RAWG_API_KEY,
  },

  // CORS configuration
  cors: {
    allowedOrigins: [CORS_ALLOWED_ORIGINS],
  },
};
