const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Attach decoded payload to req.user for downstream handlers
    req.user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
