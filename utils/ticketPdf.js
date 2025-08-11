const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

/**
 * Generates a ticket PDF as a Buffer, with embedded QR code.
 * @param {Object} ticket Ticket data
 * @returns {Promise<Buffer>}
 */
async function generateTicketPDF(ticket) {
  // 1. Generate QR code as base64
  // Ticket number will return after scan the QR code
  const qrData = JSON.stringify({ 
    ticketNumber: ticket.ticketNumber, 
    passengerName: ticket.passengerName,
    departureStation: ticket.departureStation,
    destinationStation: ticket.destinationStation,
    fare: ticket.fare
  });
  const qrImageDataUrl = await QRCode.toDataURL(qrData);

  // 2. Start PDF
  const doc = new PDFDocument({ margin: 50 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

 
  doc.fontSize(22).text('Metro Rail Ticket', { align: 'center' });
  doc.image('public/metro.jpg', { width: 100, align: 'left'}); // Adjust path to your logo

  doc.moveDown();
  doc.fontSize(14).text(`Ticket Number: ${ticket.ticketNumber}`);
  doc.text(`Passenger: ${ticket.passengerName} (ID: ${ticket.passengerId})`);
  doc.text(`Type: ${ticket.type1} (${ticket.type2})`);
  doc.text(`Reservation ID: ${ticket.reservationId}`);
  doc.text(`Journey Date: ${ticket.reservationDate} (All Day on this date)`);
  doc.text(`Reservation Time: ${ticket.reservationTime}`);
  doc.text(`From: ${ticket.departureStation}`);
  doc.text(`To: ${ticket.destinationStation}`);
  doc.text(`Fare: ${ticket.fare} BDT`);
  doc.moveDown();

  // 3. Add QR code image
  // Strip off the data:image/png;base64, part
  const qrImageBase64 = qrImageDataUrl.replace(/^data:image\/png;base64,/, "");
  const qrImageBuffer = Buffer.from(qrImageBase64, 'base64');
  doc.image(qrImageBuffer, { align: 'center', width: 120 });

  doc.end();

  return new Promise((resolve, reject) => {
    const bufs = [];
    doc.on('data', d => bufs.push(d));
    doc.on('end', () => resolve(Buffer.concat(bufs)));
  });
}

module.exports = { generateTicketPDF };