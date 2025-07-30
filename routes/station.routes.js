const express = require("express");
const router = express.Router();
const stationController = require("../controllers/station.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware, stationController.getAllStation);
router.post("/", authMiddleware, stationController.createStation);
router.put("/:id", authMiddleware, stationController.updateStation);
router.delete("/:id", authMiddleware, stationController.deleteStation);

module.exports = router;