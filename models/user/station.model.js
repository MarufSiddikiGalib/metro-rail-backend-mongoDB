const mongoose = require("mongoose");

// Define schema with your field names (all uppercase, as in your collection)
const stationSchema = new mongoose.Schema({
  STATIONNAME: { type: String, required: true },
  LOCATION: { type: String, required: true },
  PLATFORM: { type: String, required: true },
  ZONEID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Zone" }
}, { collection: "stations" }); // Specify collection name if needed

// Prevent OverwriteModelError
const Station = mongoose.models.Station || mongoose.model("Station", stationSchema);

// Get all stations as full objects (no mapping, just return array of objects)
exports.getAllStations = async () => {
  return await Station.find({}).lean();
};

exports.Station = Station;