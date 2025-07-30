const dashboardModel = require("../models/dashboard.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardModel.getAllTableCounts();
    res.json(stats);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
    
  }
};