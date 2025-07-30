const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

// GET /api/dashboard-stats
router.get("/admin/dashboard-stats", authMiddleware, dashboardController.getDashboardStats);

module.exports = router;