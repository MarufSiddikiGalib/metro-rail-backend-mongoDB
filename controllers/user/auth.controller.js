const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user.model");

// Signup controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findByUsername(username);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(username, hashedPassword);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const row = await User.findByUsername(username);
    if (!row) return res.status(404).json({ error: "User not found" });

    const [userId, dbUsername, dbPassword] = row;
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, username: dbUsername });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout controller (using token blacklist)
const { blacklistToken } = require("../../utils/tokenBlacklist");
exports.logout = async (req, res) => {
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
};