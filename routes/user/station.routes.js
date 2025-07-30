const express = require("express");
const router = express.Router();
const stationController = require("../../controllers/user/station.controller");

// GET /api/stations
router.get("/", stationController.getStations);

// GET /api/schedules
router.get("/schedules", stationController.getSchedules);

module.exports = router;