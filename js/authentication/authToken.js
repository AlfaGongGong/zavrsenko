const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Middleware function to authenticate user
const authenticate = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Store user information in the request object
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Export the authenticate function
module.exports = authenticate;
