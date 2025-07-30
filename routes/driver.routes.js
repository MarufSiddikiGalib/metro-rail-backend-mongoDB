const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const authMiddleware = require("../middleware/auth.middleware");


// Public route, no authentication required

//router.get("/", staffController.getAllStaff);
//router.post("/", staffController.createStaff);
//router.put("/:id", staffController.updateStaff);
//router.delete("/:id", staffController.deleteStaff);


// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware,driverController.getAllDriver);
router.post("/", authMiddleware, driverController.createDriver); 
router.put("/:id", authMiddleware, driverController.updateDriver); 
router.delete("/:id", authMiddleware, driverController.deleteDriver);



module.exports = router;
