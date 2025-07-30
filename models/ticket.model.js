const getConnection = require("../config/db");

// Get all tickets
exports.getAllTicket = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Ticket ORDER BY TicketNumber");
  await conn.close();
  return result.rows;
};

exports.deleteTicket = async (ticketNumber) => {
  const conn = await getConnection();

  try {
    // 1. Get PassengerId for the ticket
    const result = await conn.execute(
      "SELECT PassengerId FROM Ticket WHERE TicketNumber = :ticketNumber",
      [ticketNumber]
    );
    if (!result.rows.length) {
      await conn.close();
      return { notFound: true };
    }
    const passengerId = result.rows[0][0];

    // 2. Find all ReservationIds for this passenger
    const reservationResult = await conn.execute(
      "SELECT ReservationId FROM Reservation WHERE PassengerId = :passengerId",
      [passengerId]
    );

    if (!reservationResult.rows.length) {
      await conn.close();
      return { notFound: true };
    }
    // Extract reservation IDs from the result
    const reservationId = result.rows[0][0];
    

    // 3. Delete from TicketReservation for this ticket and these reservations
    if (reservationId.length > 0) {
      // Delete TicketReservation for ticket and any reservation of the passenger
      await conn.execute(
        `DELETE FROM TicketReservation WHERE TicketNumber = :ticketNumber or where passengerId = :passengerId`,
        [ticketNumber, passengerId]
      );
    } else {
      // Only delete TicketReservation for this ticket if no reservations
      await conn.execute(
        "DELETE FROM TicketReservation WHERE TicketNumber = :ticketNumber",
        [ticketNumber]
      );
    }

    // 4. Delete Reservations for this passenger
    await conn.execute(
      "DELETE FROM Reservation WHERE PassengerId = :passengerId",
      [passengerId]
    );

    // 5. Delete the ticket
    await conn.execute(
      "DELETE FROM Ticket WHERE TicketNumber = :ticketNumber",
      [ticketNumber]
    );

    // 6. Delete the passenger
    await conn.execute(
      "DELETE FROM Passengers WHERE PassengerId = :passengerId",
      [passengerId],
      { autoCommit: true }
    );

    await conn.close();
    return { success: true };
  } catch (err) {
    await conn.close();
    throw err;
  }
};