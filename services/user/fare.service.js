const Fare = require("../../models/user/fare.model");

const fareMatrix = {
  OneWay: { Economy: 2, Business: 3, VIP: 6 },
  Round:  { Economy: 3, Business: 5, VIP: 10 },
  MultiCity: { Economy: 3, Business: 5, VIP: 10 },
};

const childDiscount = 0.5;

exports.calculateFare = async ({
  fromStationId,
  toStationId,
  travellerType,
  ticketType1,
  ticketType2,
}) => {
  if (fromStationId === toStationId) throw new Error("Departure and destination cannot be the same station.");

  // Get distances for both stations (sum both, as in your original code)
  const distanceA = await Fare.getStationDistance(fromStationId);
  const distanceB = await Fare.getStationDistance(toStationId);
  const totalDistance = distanceA + distanceB;

  let farePerKm = fareMatrix[ticketType1][ticketType2];
  if (travellerType === "Child") farePerKm *= childDiscount;

  const fare = Math.round(totalDistance * farePerKm);
  return { distance: totalDistance, fare };
};