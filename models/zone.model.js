const mongoose = require("mongoose");

// Mongoose schema for Zone
const zoneSchema = new mongoose.Schema({
  ZONENAME: {
    type: String,
    required: true,
  },
});

// Model: Zone
const Zone = mongoose.model("Zone", zoneSchema);

// Export both the model and the CRUD functions as an object
module.exports = {
  Zone, // for direct model access (e.g., .findById)
  getAllZone: async () => {
    return await Zone.find().sort({ _id: 1 });
  },
  createZone: async (name) => {
    const newZone = new Zone({ ZONENAME: name });
    return await newZone.save();
  },
  updateZone: async (id, name) => {
    return await Zone.findByIdAndUpdate(id, { ZONENAME: name }, { new: true });
  },
  deleteZone: async (id) => {
    return await Zone.findByIdAndDelete(id);
  },
};