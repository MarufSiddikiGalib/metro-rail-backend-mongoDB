const oracledb = require("oracledb");
const getConnection = require("../../config/db");

exports.createTicketWithReservation = async ({
  type1,
  type2,
  passengerId,
  reservationDate,
  reservationTime,
  fare,
  departureStation,
  destinationStation
}) => {
  const conn = await getConnection();

  try {
    // 1. Create Ticket
    const ticketResult = await conn.execute(
      `INSERT INTO Ticket (TicketNumber, Type1, Type2, PassengerId)
       VALUES (seq_TicketNumber.NEXTVAL, :type1, :type2, :passengerId)
       RETURNING TicketNumber INTO :ticketNumber`,
      {
        type1,
        type2,
        passengerId,
        ticketNumber: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    const ticketNumber = ticketResult.outBinds.ticketNumber[0];

    // 2. Create Reservation
    const reservationResult = await conn.execute(
      `INSERT INTO Reservation (ReservationId, ReservationDate, ReservationTime, PassengerId)
       VALUES (seq_ReservationId.NEXTVAL, TO_DATE(:reservationDate, 'YYYY-MM-DD'), TO_TIMESTAMP(:reservationTime, 'HH24:MI:SS'), :passengerId)
       RETURNING ReservationId INTO :reservationId`,
      {
        reservationDate,   // e.g., "2025-06-12"
        reservationTime,   // e.g., "09:30:00"
        passengerId,
        reservationId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    const reservationId = reservationResult.outBinds.reservationId[0];

    // 3. Link Ticket and Reservation
    await conn.execute(
      `INSERT INTO TicketReservation (TicketNumber, ReservationId)
       VALUES (:ticketNumber, :reservationId)`,
      { ticketNumber, reservationId }
    );

    // 4. Get Passenger Name
    const passengerResult = await conn.execute(
      `SELECT Name FROM Passengers WHERE PassengerId = :passengerId`,
      { passengerId }
    );
    const passengerName =
      passengerResult.rows.length > 0 ? passengerResult.rows[0][0] : null;

    // Commit all
    await conn.commit();

    // 5. Return all ticket details (including fare and stations)
    return {
      ticketNumber,
      type1,
      type2,
      passengerId,
      passengerName,
      reservationId,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    await conn.close();
  }
};