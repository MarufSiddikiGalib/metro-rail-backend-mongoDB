const Fare = require("../../models/user/fare.model");

// Simple fare matrix
const fareMatrix = {
  OneWay: {
    Economy: 2,
    Business: 3,
    VIP: 6,
  },
  Round: {
    Economy: 3,
    Business: 5,
    VIP: 10,
  },
  MultiCity: {
    Economy: 3,
    Business: 5,
    VIP: 10,
  },
};
const childDiscount = 0.5; // 50% discount for child

exports.calculateFare = async ({
  fromStationId,
  toStationId,
  travellerType, // "Adult" or "Child"
  ticketType1,   // "OneWay" or "RoundWay"
  ticketType2,   // "Regular", "Student", "VIP"
}) => {
  if (fromStationId === toStationId) {
     throw new Error("Departure and destination cannot be the same station.");
   }
// Get distances for both stations
    const distanceA = await Fare.getStationDistance(fromStationId);
    const distanceB = await Fare.getStationDistance(toStationId);
    const totalDistance = distanceA + distanceB;
  // 2. Get base fare per km
  let farePerKm = fareMatrix[ticketType1][ticketType2];
  if (travellerType === "Child") {
    farePerKm = farePerKm * childDiscount;
  }
  // 3. Calculate total fare
  const fare = Math.round(totalDistance * farePerKm);

  return { distance: totalDistance, fare };
};