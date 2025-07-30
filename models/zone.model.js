const getConnection = require("../config/db");

exports.getAllZone = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Zone ORDER BY ZoneId");
  await conn.close();
  return result.rows;
};

exports.createZone = async (name) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Zone (ZoneId, ZoneName )
     VALUES (seq_ZoneId.NEXTVAL, : name)`,
    [name],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.updateZone = async (id, name) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Zone SET ZoneName = :name WHERE ZoneId = :id`,
    [name, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.deleteZone = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Zone WHERE ZoneId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};
