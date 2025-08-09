const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/user/transaction.controller");


// No authentication middleware needed (adjust if required)
router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.createTransaction);

module.exports = router;