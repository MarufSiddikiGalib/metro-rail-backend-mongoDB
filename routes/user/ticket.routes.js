const express = require("express");
const router = express.Router();
const ticketController = require("../../controllers/user/ticket.controller");

router.post("/buy", ticketController.buyTicket);

module.exports = router;