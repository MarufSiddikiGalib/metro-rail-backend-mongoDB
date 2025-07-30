const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passenger.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware, passengerController.getAllPassengers);
router.post("/", authMiddleware, passengerController.createPassenger); 
router.put("/:id", authMiddleware, passengerController.updatePassenger); 
router.delete("/:id", authMiddleware, passengerController.deletePassenger);

module.exports = router;