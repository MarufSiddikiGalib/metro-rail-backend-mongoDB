const getConnection = require("../config/db");

exports.getAllStaff = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Staff ORDER BY StaffId");
  await conn.close();
  return result.rows;
};

exports.createStaff = async (role, shift) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Staff (StaffId, Role, AssignedShift)
     VALUES (seq_StaffId.NEXTVAL, :role, :shift)`,
    [role, shift],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.updateStaff = async (id, role, shift) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Staff SET Role = :role, AssignedShift = :shift WHERE StaffId = :id`,
    [role, shift, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.deleteStaff = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Staff WHERE StaffId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};
