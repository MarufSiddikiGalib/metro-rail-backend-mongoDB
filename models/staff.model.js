const mongoose = require("mongoose");

// Mongoose schema for Staff
const staffSchema = new mongoose.Schema({
  ROLE: {
    type: String,
    required: true,
  },
  ASSIGNEDSHIFT: {
    type: String,
    required: true,
  },
});

// Model: Staff
const Staff = mongoose.model("Staff", staffSchema);

// 🔁 Get all staff, sorted by creation order
exports.getAllStaff = async () => {
  return await Staff.find().sort({ _id: 1 });
};

//  Create a new staff member
exports.createStaff = async (ROLE, ASSIGNEDSHIFT) => {
  const newStaff = new Staff({ ROLE, ASSIGNEDSHIFT });
  return await newStaff.save();
};

// Update a staff member by ID
exports.updateStaff = async (id, ROLE, ASSIGNEDSHIFT) => {
  return await Staff.findByIdAndUpdate(id, { ROLE, ASSIGNEDSHIFT }, { new: true });
};

// Delete a staff member by ID
exports.deleteStaff = async (id) => {
  return await Staff.findByIdAndDelete(id);
};