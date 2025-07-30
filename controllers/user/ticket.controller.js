const ticketService = require("../../services/user/ticket.service");
const { generateTicketPDF } = require("../../utils/ticketPdf"); // Import the PDF/QR generator

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

    // Basic validation
    if (
      !type1 ||
      !type2 ||
      !passengerId ||
      !reservationDate ||
      !reservationTime ||
      fare === undefined ||
      !departureStation ||
      !destinationStation
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const ticketDetails = await ticketService.generateTicket({
      type1,
      type2,
      passengerId,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    });

   // 2. Generate PDF with embedded QR code
   const pdfBuffer = await generateTicketPDF(ticketDetails);

   // 3. Respond with ticket info and PDF (base64 for frontend, or download for browser)
   res.status(201).json({
     ...ticketDetails,
     ticketPdfBase64: pdfBuffer.toString('base64') // For direct browser download or display
   });

   // Optional: For direct PDF download in browser, set headers and send the buffer:
   /*
   res.set({
     'Content-Type': 'application/pdf',
     'Content-Disposition': `attachment; filename="ticket_${ticketDetails.ticketNumber}.pdf"`,
     'Content-Length': pdfBuffer.length,
   });
   res.send(pdfBuffer);
   */

 } catch (err) {
   res.status(500).json({ error: err.message });
 }
};
