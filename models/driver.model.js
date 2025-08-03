const mongoose = require("mongoose");

// Mongoose schema for Driver
const driverSchema = new mongoose.Schema({
  CONTACTINFO: {
    type: String,
    required: true,
  },
  EXPERIENCE: {
    type: Number,
    required: true,
  },
  NAME: {
    type: String,
    required: true,
  },
  LICENSENUMBER: {
    type: String,
    required: true,
    unique: true,
  },
});

// Model: Driver
const Driver = mongoose.model("Driver", driverSchema);

// 🔁 Get all drivers, sorted by creation order
exports.getAllDriver = async () => {
  return await Driver.find().sort({ _id: 1 });
};

// 🆕 Create a new driver
exports.createDriver = async (CONTACTINFO, EXPERIENCE, NAME, LICENSENUMBER) => {
  const newDriver = new Driver({ CONTACTINFO, EXPERIENCE, NAME, LICENSENUMBER });
  return await newDriver.save();
};

// ✏️ Update a driver by ID
exports.updateDriver = async (id, CONTACTINFO, EXPERIENCE, NAME, LICENSENUMBER) => {
  return await Driver.findByIdAndUpdate(
    id,
    { CONTACTINFO, EXPERIENCE, NAME, LICENSENUMBER },
    { new: true }
  );
};

// ❌ Delete a driver by ID
exports.deleteDriver = async (id) => {
  return await Driver.findByIdAndDelete(id);
};