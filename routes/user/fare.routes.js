const express = require("express");
const router = express.Router();
const fareController = require("../../controllers/user/fare.controller");

// POST /api/fare
router.post("/", fareController.getFare);

module.exports = router;