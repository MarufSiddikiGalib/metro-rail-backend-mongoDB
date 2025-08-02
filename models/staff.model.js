const mongoose = require("mongoose");

// Mongoose schema for Staff
const staffSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  assignedShift: {
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
exports.createStaff = async (role, assignedShift) => {
  const newStaff = new Staff({ role, assignedShift });
  return await newStaff.save();
};

// Update a staff member by ID
exports.updateStaff = async (id, role, assignedShift) => {
  return await Staff.findByIdAndUpdate(id, { role, assignedShift }, { new: true });
};

// Delete a staff member by ID
exports.deleteStaff = async (id) => {
  return await Staff.findByIdAndDelete(id);
};