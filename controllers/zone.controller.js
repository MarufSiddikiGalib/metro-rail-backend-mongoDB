const ZoneModel = require("../models/zone.model");

exports.getAllZone = async (req, res) => {
  try {
    const data = await ZoneModel.getAllZone();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.updateZone = async (req, res) => {
  const { id } = req.params;
  const { ZoneName } = req.body;

  try {
    await ZoneModel.updateZone(id, ZoneName);
    res.json({ message: "Zone updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteZone = async (req, res) => {
  const { id } = req.params;

  try {
    await ZoneModel.deleteZone(id);
    res.json({ message: "Zone deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
