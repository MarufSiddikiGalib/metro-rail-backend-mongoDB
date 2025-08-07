const mongoose = require("mongoose");

// User schema for MongoDB Atlas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // Store hashed password
  password: { type: String, required: true },
}, { collection: "users" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Find user by username
exports.findByUsername = async (username) => {
  return await User.findOne({ username });
};

// Create a new user
exports.createUser = async (username, hashedPassword) => {
  const user = new User({ username, password: hashedPassword });
  return await user.save();
};

// For completeness, export model (may be useful for population, etc.)
exports.User = User;