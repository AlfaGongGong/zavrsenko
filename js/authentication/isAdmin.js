//  authorizing administrators
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }
  next();
};

module.exports = isAdmin;
