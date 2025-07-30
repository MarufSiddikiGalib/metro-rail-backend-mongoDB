const fareService = require("../../services/user/fare.service");

exports.getFare = async (req, res) => {
  try {
    const { fromStationId, toStationId, travellerType, ticketType1, ticketType2 } = req.body;
    const result = await fareService.calculateFare({
      fromStationId,
      toStationId,
      travellerType,
      ticketType1,
      ticketType2,
    });
    res.json({ fare: result.fare, distance: result.distance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};