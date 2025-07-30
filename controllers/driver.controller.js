const driverModel = require("../models/driver.model");

exports.getAllDriver = async (req, res) => {
  try {
    const data = await driverModel.getAllDriver();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDriver = async (req, res) => {
  const { ContactInfo,  Experience, Name, LicenseNumber } = req.body; // field is same as input format json it takes user input from postman or frontend
  if (!ContactInfo || !Experience || !Name || !LicenseNumber ) return res.status(400).json({ error: "Missing Information" });

  try {
    await driverModel.createDriver(ContactInfo,  Experience, Name, LicenseNumber);
    res.status(201).json({ message: "Driver created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDriver = async (req, res) => {
  const { id } = req.params;
  const { ContactInfo,  Experience, Name, LicenseNumber } = req.body;

  try {
    await driverModel.updateDriver(id, ContactInfo,  Experience, Name, LicenseNumber);
    res.json({ message: "Driver updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    await driverModel.deleteDriver(id);
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
