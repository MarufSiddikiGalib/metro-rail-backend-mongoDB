const mongoose = require("mongoose");

// Mongoose schema for Zone
const zoneSchema = new mongoose.Schema({
  ZoneName: {
    type: String,
    required: true,
  },
});

// Model: Zone
const Zone = mongoose.model("Zone", zoneSchema);

//Get all zones, sorted by creation order
exports.getAllZone = async () => {
  return await Zone.find().sort({ _id: 1 });
};

// Create a new zone
exports.createZone = async (name) => {
  const newZone = new Zone({ ZoneName: name });
  return await newZone.save();
};

// Update a zone by ID
exports.updateZone = async (id, name) => {
  return await Zone.findByIdAndUpdate(id, { ZoneName: name }, { new: true });
};

// Delete a zone by ID
exports.deleteZone = async (id) => {
  return await Zone.findByIdAndDelete(id);
};
