const jwt = require("jsonwebtoken");

// Middleware for authenticating requests using JWT tokens.
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed. Invalid token." });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
