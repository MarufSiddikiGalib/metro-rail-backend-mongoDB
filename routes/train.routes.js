const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middleware/auth.middleware");


// Public route, no authentication required

//router.get("/", staffController.getAllStaff);
//router.post("/", staffController.createStaff);
//router.put("/:id", staffController.updateStaff);
//router.delete("/:id", staffController.deleteStaff);


// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware, trainController.getAllTrain);
router.post("/", authMiddleware, trainController.createTrain);
router.put("/:id", authMiddleware, trainController.updateTrain);
router.delete("/:id", authMiddleware, trainController.deleteTrain);



module.exports = router;
