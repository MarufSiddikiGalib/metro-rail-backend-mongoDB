const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");
const authMiddleware = require("../middleware/auth.middleware");


// Public route, no authentication required

//router.get("/", staffController.getAllStaff);
//router.post("/", staffController.createStaff);
//router.put("/:id", staffController.updateStaff);
//router.delete("/:id", staffController.deleteStaff);


// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware,staffController.getAllStaff);
router.post("/", authMiddleware, staffController.createStaff); 
router.put("/:id", authMiddleware, staffController.updateStaff); 
router.delete("/:id", authMiddleware, staffController.deleteStaff);



module.exports = router;
