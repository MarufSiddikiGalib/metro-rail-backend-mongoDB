const stationModel = require("../models/station.model");
const zoneModel = require("../models/zone.model");

// Get all stations
exports.getAllStation = async (req, res) => {
  try {
    const stations = await stationModel.getAllStation();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
};

// Create a new station
exports.createStation = async (req, res) => {
  const { stationName, location, platform, zoneId } = req.body;

  // 🔑 Check if the referenced Zone exists before creating the Station
  const zoneExists = await zoneModel.Zone.findById(zoneId);
  if (!zoneExists) {
    return res.status(400).json({ error: "Zone not found. Please add the zone first." });
  }

  try {
    await stationModel.createStation(stationName, location, platform, zoneId);
    res.status(201).json({ message: "Station created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create station" });
  }
};

// Update a station
exports.updateStation = async (req, res) => {
  const id = req.params.id;
  const { stationName, location, platform, zoneId } = req.body;

  // 🔑 Optional: Check if the new zoneId exists
  if (zoneId) {
    const zoneExists = await zoneModel.Zone.findById(zoneId);
    if (!zoneExists) {
      return res.status(400).json({ error: "Zone not found. Please add the zone first." });
    }
  }

  try {
    await stationModel.updateStation(id, stationName, location, platform, zoneId);
    res.status(200).json({ message: "Station updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update station" });
  }
};

// Delete a station
exports.deleteStation = async (req, res) => {
  const id = req.params.id;
  try {
    await stationModel.deleteStation(id);
    res.status(200).json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete station" });
  }
};

/*
-----------------------------------------
Relational Handling Explained (NoSQL):
-----------------------------------------
- In SQL, ZoneId is a foreign key and enforced by DB. Deleting a Zone with stations fails, or you set ON DELETE CASCADE.
- In MongoDB:
    - You store Zone _id (ObjectId) as zoneId in Station.
    - You must check (in code) if the zoneId provided exists in the Zone collection before creating/updating a Station.
    - Deleting a Zone does not affect existing Stations; you must handle "cascading delete" in your application logic if needed.
- When fetching Stations, you can use .populate('zoneId') to get full zone details.
*/