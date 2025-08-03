const driverModel = require("../models/driver.model");

// Get all drivers
exports.getAllDriver = async (req, res) => {
  try {
    const data = await driverModel.getAllDriver();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a driver
exports.createDriver = async (req, res) => {
  const { ContactInfo, Experience, Name, LicenseNumber } = req.body;
  if (!ContactInfo || !Experience || !Name || !LicenseNumber) {
    return res.status(400).json({ error: "Missing information" });
  }
  try {
    await driverModel.createDriver(ContactInfo, Experience, Name, LicenseNumber);
    res.status(201).json({ message: "Driver created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a driver by ID
exports.updateDriver = async (req, res) => {
  const { id } = req.params;
  const { ContactInfo, Experience, Name, LicenseNumber } = req.body;
  try {
    await driverModel.updateDriver(id, ContactInfo, Experience, Name, LicenseNumber);
    res.json({ message: "Driver updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a driver by ID
exports.deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    await driverModel.deleteDriver(id);
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};