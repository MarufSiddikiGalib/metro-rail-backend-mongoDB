const mongoose = require("mongoose");

// --- Model code inside this controller file ---
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  paymentMethod1: { type: String, required: true },
  paymentMethod2: { type: String },
  ticketNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
});
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

// --- Controller functions ---

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, paymentDate, paymentMethod1, paymentMethod2, ticketNumber } = req.body;

    if (
      amount === undefined ||
      !paymentDate ||
      !paymentMethod1 ||
      !ticketNumber
    ) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const transaction = new Transaction({
      amount,
      paymentDate,
      paymentMethod1,
      paymentMethod2,
      ticketNumber,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

