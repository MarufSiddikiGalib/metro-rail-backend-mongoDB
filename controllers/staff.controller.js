const staffModel = require("../models/staff.model");

exports.getAllStaff = async (req, res) => {
  try {
    const data = await staffModel.getAllStaff();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStaff = async (req, res) => {
  const { role, assignedShift } = req.body;
  if (!role || !assignedShift) return res.status(400).json({ error: "Missing role or shift" });

  try {
    await staffModel.createStaff(role, assignedShift);
    res.status(201).json({ message: "Staff created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { role, assignedShift } = req.body;

  try {
    await staffModel.updateStaff(id, role, assignedShift);
    res.json({ message: "Staff updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    await staffModel.deleteStaff(id);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
