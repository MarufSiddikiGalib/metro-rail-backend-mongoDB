const trainModel = require("../models/train.model");

exports.getAllTrain = async (req, res) => {
  try {
    const data = await trainModel.getAllTrain();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTrain = async (req, res) => {
  const { capacity, time, trainId } = req.body;
  if (!capacity || !time || !trainId) return res.status(400).json({ error: "Missing capacity, time or trainId" });

  try {
    await trainModel.createTrain(capacity, time, trainId);
    res.status(201).json({ message: "Train created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrain = async (req, res) => {
  const { id } = req.params;
  const { capacity, time, trainId } = req.body;

  try {
    await trainModel.updateTrain(id, capacity, time, trainId);
    res.json({ message: "Train updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrain = async (req, res) => {
  const { id } = req.params;

  try {
    await trainModel.deleteTrain(id);
    res.json({ message: "Train deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
