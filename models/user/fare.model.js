const mongoose = require("mongoose");

// Models for collections
const StationRoute = mongoose.models.StationRoute || mongoose.model(
  "StationRoute",
  new mongoose.Schema({
    StationId: mongoose.Schema.Types.ObjectId,
    RouteId: Number,
  }),
  "stationroutes"
);

const RouteDetails = mongoose.models.RouteDetails || mongoose.model(
  "RouteDetails",
  new mongoose.Schema({
    RouteId: Number,
    TotalDistance: Number,
  }),
  "routedetails"
);

// Get total distance for a station via StationRoute + RouteDetails
exports.getStationDistance = async (stationId) => {
  // Find the route for this station
  const sr = await StationRoute.findOne({ StationId: new mongoose.Types.ObjectId(stationId) }).lean();
  if (!sr) throw new Error("No route for station");

  // Get the route's distance
  const rd = await RouteDetails.findOne({ RouteId: sr.RouteId }).lean();
  if (!rd) throw new Error("No route details for route");

  return rd.TotalDistance;
};