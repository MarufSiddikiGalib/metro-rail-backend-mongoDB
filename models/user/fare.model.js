const getConnection = require("../../config/db");

exports.getStationDistance = async (stationId) => {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT rd.TotalDistance
     FROM StationRoute sr
     JOIN RouteDetails rd ON sr.RouteId = rd.RouteId
     WHERE sr.StationId = :stationId`,
    [stationId]
  );
  await connection.close();
  if (result.rows.length) {
    return result.rows[0][0];
  }
  throw new Error("Station or route not found.");
};