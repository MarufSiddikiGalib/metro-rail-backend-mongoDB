const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const ZoneController = require("../controllers/zone.controller");


// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware,ZoneController.getAllZone)
router.post("/", authMiddleware, ZoneController.createZone); 
router.put("/:id", authMiddleware, ZoneController.updateZone); 
router.delete("/:id", authMiddleware, ZoneController.deleteZone);



module.exports = router;
