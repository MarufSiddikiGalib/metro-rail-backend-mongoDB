const staffModel = require("../models/staff.model");

// GET /api/staff — Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const data = await staffModel.getAllStaff();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/staff — Create new staff
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

// PUT /api/staff/:id — Update staff
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { role, assignedShift } = req.body;

  try {
    const updatedStaff = await staffModel.updateStaff(id, role, assignedShift);
    if (!updatedStaff) return res.status(404).json({ error: "Staff not found" });

    res.json({ message: "Staff updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/staff/:id — Delete staff
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStaff = await staffModel.deleteStaff(id);
    if (!deletedStaff) return res.status(404).json({ error: "Staff not found" });

    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};