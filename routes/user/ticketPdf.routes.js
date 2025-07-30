const express = require('express');
const router = express.Router();
const { generateTicketPDF } = require('../../utils/ticketPdf');
const ticketService = require('../../services/user/ticket.service');

// POST /api/ticket/pdf
// Expects full ticket data in body (ideally after purchase)
router.post('/pdf', async (req, res) => {
  try {
    const ticket = req.body;
    // Optionally, you can fetch ticket data from DB using ticketNumber
    // const ticket = await ticketService.getTicketByNumber(req.body.ticketNumber);

    const pdfBuffer = await generateTicketPDF(ticket);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ticket_${ticket.ticketNumber}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;