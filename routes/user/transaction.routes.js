const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/user/transaction.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// No authentication middleware needed (adjust if required)
router.get("/", authMiddleware, transactionController.getAllTransaction);
router.post("/", transactionController.createTransaction);

module.exports = router;