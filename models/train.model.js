const getConnection = require("../config/db");

exports.getAllTrain = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Coach ORDER BY CoachId");
  await conn.close();
  return result.rows;
};

exports.createTrain = async (capacity, time,  trainId ) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Coach (CoachId, Capacity, Time, TrainId)
     VALUES (seq_CoachId.NEXTVAL, :capacity, :time, :trainId)`,
    [capacity, time,  trainId],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.updateTrain = async (id, capacity, time,  trainId) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Coach SET Capacity = :capacity, Time = :time, TrainId = :trainId  WHERE CoachId = :id`,
    [capacity, time,  trainId, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.deleteTrain = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Coach WHERE CoachId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};
