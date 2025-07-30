const passengerModel = require("../models/passenger.model");

exports.getAllPassengers = async (req, res) => {
  try {
    const data = await passengerModel.getAllPassengers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPassenger = async (req, res) => {
  const { Name, Address } = req.body;
  if (!Name || !Address) return res.status(400).json({ error: "Missing Information" });

  try {
    await passengerModel.createPassenger(Name, Address);
    res.status(201).json({ message: "Passenger created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassenger = async (req, res) => {
  const { id } = req.params;
  const { Name, Address } = req.body;
  if (!Name || !Address) return res.status(400).json({ error: "Missing Information" });

  try {
    await passengerModel.updatePassenger(id, Name, Address);
    res.json({ message: "Passenger updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePassenger = async (req, res) => {
  const { id } = req.params;

  try {
    await passengerModel.deletePassenger(id);
    res.json({ message: "Passenger deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};