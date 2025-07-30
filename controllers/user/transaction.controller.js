const getConnection = require("../../config/db");

// GET all transactions
exports.getAllTransaction = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT TransactionId, Amount, PaymentDate, PaymentMethod1, PaymentMethod2, TicketNumber 
       FROM TransactionTicket 
       ORDER BY TransactionId DESC`
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE/store transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, paymentDate, paymentMethod1, paymentMethod2, ticketNumber } = req.body;

    // Optional: check for ticket existence here if you want strict FK validation

    const conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO TransactionTicket
        (TransactionId, Amount, PaymentDate, PaymentMethod1, PaymentMethod2, TicketNumber)
        VALUES (seq_TransactionTicketId.NEXTVAL, :amount, TO_DATE(:paymentDate, 'YYYY-MM-DD'), :paymentMethod1, :paymentMethod2, :ticketNumber)
        RETURNING TransactionId INTO :outId`,
      {
        amount,
        paymentDate,
        paymentMethod1,
        paymentMethod2,
        ticketNumber,
        outId: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER }
      },
      { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ TransactionId: result.outBinds.outId[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};