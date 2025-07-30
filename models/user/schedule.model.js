const getConnection = require("../../config/db");

// Fetch all available schedules
exports.getAllSchedules = async () => {
  const connection = await getConnection();
  const result = await connection.execute(
    "SELECT ScheduleId, ArrivalTime, DepartureTime, Frequency, TrainId FROM Schedule"
  );
  await connection.close();
  return result.rows;
};