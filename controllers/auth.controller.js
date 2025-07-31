const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await Admin.findByUsername(username);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.createAdmin(username, hashedPassword);
    res.status(201).json({ message: "Admin created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Admin.findByUsername(username);
    if (!user) return res.status(404).json({ error: "User not found" });

    // user.password is the hashed password stored in MongoDB
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const row = await Admin.findByUsername(username);
//     if (!row) return res.status(404).json({ error: "User not found" });

//     const [adminId, dbUsername, dbPassword] = row;
//     const match = await bcrypt.compare(password, dbPassword);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ adminId, username }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token, username: dbUsername });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
