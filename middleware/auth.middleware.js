const jwt = require('jsonwebtoken');
// const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(" ")[1];

// Blacklist Token Check
  // if (await isTokenBlacklisted(token)) {
  //   return res.status(401).json({ error: "Token is blacklisted" });
  // }



  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // store decoded info
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
