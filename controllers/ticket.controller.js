const Ticket = require("../models/ticket.model");
const { Passenger } = require("../models/passenger.model");

// Get all tickets
exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("passenger");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to get tickets", details: err.message });
  }
}

// Delete a ticket and its associated passenger
exports.deleteTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    // 1. Find the ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // 2. Get the passenger ID from the ticket
    const passengerId = ticket.passenger;

    // 3. Delete the ticket
    await Ticket.deleteOne({ _id: ticketId });

    // 4. Delete the passenger (if present)
    if (passengerId) {
     await Passenger.deleteOne({ _id: passengerId });
    }

    res.status(200).json({ message: "Ticket and passenger deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete ticket and passenger", details: err.message });
  }
}

