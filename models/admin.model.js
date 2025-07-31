const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);

exports.findByUsername = async (username) => {
  return await Admin.findOne({ username });
};

exports.createAdmin = async (username, hashedPassword) => {
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
};