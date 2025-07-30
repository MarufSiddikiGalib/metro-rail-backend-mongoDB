const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { blacklistToken } = require("../utils/tokenBlacklist");
const jwt = require("jsonwebtoken");

router.post("/signup", signup); // optional: seed only once
router.post("/login", login);

// write the controler logic here for logout
router.post("/logout", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.decode(token);
      await blacklistToken(token, decoded.exp);
      res.json({ message: "Logged out, token blacklisted." });
    } catch (err) {
      res.status(400).json({ error: "Logout failed" });
    }
  });
  



module.exports = router;
