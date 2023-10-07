function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle JSON parse error (like invalid JSON in the request)
    return res.status(400).json({ message: "Bad Request: Invalid JSON" });
  }

  // Handle other errors
  res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;
