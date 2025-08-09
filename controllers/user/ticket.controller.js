const Ticket = require("../../models/user/ticket.model");
const { Passenger, registerPassenger } = require("../../models/user/passenger.model");
const { generateTicketPDF } = require("../../utils/ticketPdf"); // Implement this as needed

exports.buyTicket = async (req, res) => {
  try {
    const {
      type1,
      type2,
      passengerId,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    } = req.body;

    // Validate input
    if (
      !type1 || !type2 || !passengerId || !reservationDate ||
      !reservationTime || fare === undefined ||
      !departureStation || !destinationStation
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure passenger exists
    const passenger = await Passenger.findById(passengerId);
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    // Create ticket
    const ticket = await Ticket.create({
      type1,
      type2,
      passenger: passenger._id,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    });

    // Prepare ticket details for PDF and response
    const ticketDetails = {
      ticketNumber: ticket._id,
      type1,
      type2,
      passengerId: passenger._id,
      passengerName: passenger.name,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    };

    // Generate ticket PDF (implement this utility as needed)
    const pdfBuffer = await generateTicketPDF(ticketDetails);

    res.status(201).json({
      ...ticketDetails,
      ticketPdfBase64: pdfBuffer.toString("base64")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};