const ticketModel = require("../models/ticket.model");

// Get all tickets
exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await ticketModel.getAllTicket();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ticketModel.deleteTicket(id);
    if (result && result.notFound) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket, passenger, and reservations deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete ticket and related records", details: err.message });
  }
};