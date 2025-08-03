const mongoose = require("mongoose");

/**
 * Station Schema - stores station information.
 * In relational DB: ZoneId is a foreign key.
 * In MongoDB: We store the Zone's _id as a reference, but MongoDB does NOT enforce referential integrity.
 * You should check existence of the referenced Zone in your controller/service logic before creating a Station.
 */
const stationSchema = new mongoose.Schema({
  STATIONNAME: {
    type: String,
    required: true,
  },
  LOCATION: {
    type: String,
    required: true,
  },
  PLATFORM: {
    type: String,
    required: true,
  },
  ZONEID: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Zone's _id
    ref: "Zone",
    required: true,
  },
});

const Station = mongoose.model("Station", stationSchema);

// 🔁 Get all stations, sorted by creation order
exports.getAllStation = async () => {
  // Optionally populate the zone info (uncomment if you want zone data)
  // return await Station.find().sort({ _id: 1 }).populate('zoneId');
  return await Station.find().sort({ _id: 1 });
};

// 🆕 Create a new station
exports.createStation = async (STATIONNAME, LOCATION, PLATFORM, ZONEID) => {
  // ZONEID should be an existing Zone _id (ObjectId as string)
  const newStation = new Station({ STATIONNAME, LOCATION, PLATFORM, ZONEID });
  return await newStation.save();
};

// ✏️ Update a station by ID
exports.updateStation = async (id, STATIONNAME, LOCATION, PLATFORM, ZONEID) => {
  // id is Station _id; zoneId is Zone _id
  return await Station.findByIdAndUpdate(
    id,
    { STATIONNAME, LOCATION, PLATFORM, ZONEID },
    { new: true }
  );
};

// ❌ Delete a station by ID
exports.deleteStation = async (id) => {
  return await Station.findByIdAndDelete(id);
};

/*
-----------------------------------------
HOW TO HANDLE RELATIONS IN MONGODB (NoSQL)
-----------------------------------------
- MongoDB does NOT enforce foreign key constraints like a relational database.
- To "relate" Station to Zone, you store the Zone's _id (ObjectId) in the zoneId field of the Station document.
- It is YOUR responsibility in code to:
   1. Before creating a Station, verify that the provided zoneId actually exists in the Zone collection.
   2. When querying Stations, you can "populate" zone info with .populate('zoneId') for richer data.
- Deleting a Zone will NOT automatically remove or update related Stations. Handle such cascading manually if needed.
*/