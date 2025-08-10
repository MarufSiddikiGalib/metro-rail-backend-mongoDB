const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  type1: String,
  type2: String,
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  reservationDate: String,
  reservationTime: String,
  fare: Number,
  departureStation: String,
  destinationStation: String,
});

// Prevent OverwriteModelError
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;