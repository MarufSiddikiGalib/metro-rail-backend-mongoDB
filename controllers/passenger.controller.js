const { getAllPassengers, createPassenger, updatePassenger, deletePassenger } = require("../models/passenger.model");

// Get all passengers
exports.getAllPassengers = async (req, res) => {
  try {
    const data = await getAllPassengers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new passenger
exports.createPassenger = async (req, res) => {
  const { Name, Address } = req.body;
  if (!Name || !Address) {
    return res.status(400).json({ error: "Missing Information" });
  }
  try {
    await passengerModel.createPassenger(Name, Address);
    res.status(201).json({ message: "Passenger created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a passenger by ID
exports.updatePassenger = async (req, res) => {
  const { id } = req.params;
  const { Name, Address } = req.body;
  if (!Name || !Address) {
    return res.status(400).json({ error: "Missing Information" });
  }
  try {
    await passengerModel.updatePassenger(id, Name, Address);
    res.json({ message: "Passenger updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a passenger by ID
exports.deletePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    await passengerModel.deletePassenger(id);
    res.json({ message: "Passenger deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};