const getConnection = require("../config/db");

// Get all stations
exports.getAllStation = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Station ORDER BY StationId");
  await conn.close();
  return result.rows;
};

// Create a new station
exports.createStation = async (stationName, location, platform, zoneId) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Station (StationId, StationName, Location, Platform, ZoneId)
     VALUES (seq_StationId.NEXTVAL, :stationName, :location, :platform, :zoneId)`,
    [stationName, location, platform, zoneId],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

// Update a station
exports.updateStation = async (id, stationName, location, platform, zoneId) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Station SET StationName = :stationName, Location = :location, Platform = :platform, ZoneId = :zoneId WHERE StationId = :id`,
    [stationName, location, platform, zoneId, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

// Delete a station
exports.deleteStation = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Station WHERE StationId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};