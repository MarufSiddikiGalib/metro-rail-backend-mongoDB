const express = require("express");
const router = express.Router();
const passengerController = require("../../controllers/user/passenger.controller");

router.post("/", passengerController.register);

module.exports = router;