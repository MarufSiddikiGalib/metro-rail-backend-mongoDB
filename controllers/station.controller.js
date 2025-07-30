const stationModel = require("../models/station.model");

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
  try {
    const result = await stationModel.createStation(stationName, location, platform, zoneId);
    res.status(201).json({ message: "Station created successfully", result }); // result is from oracleDB
  } catch (err) {
    res.status(500).json({ error: "Failed to create station" });
  }
};

// Update a station
exports.updateStation = async (req, res) => {
  const id = req.params.id;
  const { stationName, location, platform, zoneId } = req.body;
  try {
    const result = await stationModel.updateStation(id, stationName, location, platform, zoneId);
    res.status(200).json({ message: "Station updated successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update station" });
  }
};

// Delete a station
exports.deleteStation = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await stationModel.deleteStation(id);
    res.status(200).json({ message: "Station deleted successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete station" });
  }
};