const getConnection = require("../../config/db");

// Fetch all stations
exports.getAllStations = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    "SELECT StationId, StationName, Location, Platform FROM Station"
  );
  await connection.close();
  return result.rows;
};