module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(403).json({ message: "Access denied." });
    }
  };
};
