const ZoneModel = require("../models/zone.model");

// GET /api/zone — Get all zones
exports.getAllZone = async (req, res) => {
  try {
    const data = await ZoneModel.getAllZone();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/zone — Create new zone
exports.createZone = async (req, res) => {
  const { ZoneName } = req.body;
  if (!ZoneName) return res.status(400).json({ error: "Missing Zone Name" });

  try {
    await ZoneModel.createZone(ZoneName);
    res.status(201).json({ message: "Zone created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/zone/:id — Update zone
exports.updateZone = async (req, res) => {
  const { id } = req.params;
  const { ZoneName } = req.body;

  try {
    const updatedZone = await ZoneModel.updateZone(id, ZoneName);
    if (!updatedZone) return res.status(404).json({ error: "Zone not found" });

    res.json({ message: "Zone updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/zone/:id — Delete zone
exports.deleteZone = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedZone = await ZoneModel.deleteZone(id);
    if (!deletedZone) return res.status(404).json({ error: "Zone not found" });

    res.json({ message: "Zone deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
