const Passenger = require("../../models/user/passenger.model");

exports.register = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }
    const passengerId = await Passenger.registerPassenger(name, address);
    res.status(201).json({ passengerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};