const Ticket = require("../../models/user/ticket.model");

exports.generateTicket = async (params) => {
  return await Ticket.createTicketWithReservation(params);
};