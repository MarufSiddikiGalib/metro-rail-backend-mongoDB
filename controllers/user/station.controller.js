const Station = require("../../models/user/station.model");
const Schedule = require("../../models/user/schedule.model");

// Get station list
exports.getStations = async (req, res) => {
  try {
    const stations = await Station.getAllStations();
    // Just return the full array of objects
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get journey dates/times (schedules)
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.getAllSchedules();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};