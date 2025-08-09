const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  type1: { type: String, required: true },
  type2: { type: String, required: true },
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger", required: true },
  reservationDate: { type: String, required: true }, // ISO date string
  reservationTime: { type: String, required: true }, // Time as string (e.g., "09:30:00")
  fare: { type: Number, required: true },
  departureStation: { type: String, required: true },
  destinationStation: { type: String, required: true }
}, { collection: "tickets" });

module.exports = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);