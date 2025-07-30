const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Protected routes, requires authentication (JWT token)
router.get("/", authMiddleware, ticketController.getAllTicket);
router.delete("/:id", authMiddleware, ticketController.deleteTicket);

module.exports = router;