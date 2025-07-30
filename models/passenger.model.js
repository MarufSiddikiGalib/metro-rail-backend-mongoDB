const getConnection = require("../config/db");

exports.getAllPassengers = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Passengers ORDER BY PassengerId");
  await conn.close();
  return result.rows;
};

exports.createPassenger = async (name, address) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Passengers (PassengerId, Name, Address)
     VALUES (seq_PassengerId.NEXTVAL, :name, :address)`,
    [name, address],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.updatePassenger = async (id, name, address) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Passengers SET Name = :name, Address = :address WHERE PassengerId = :id`,
    [name, address, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.deletePassenger = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Passengers WHERE PassengerId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};