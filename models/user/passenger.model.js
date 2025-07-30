const getConnection = require("../../config/db");
const oracledb = require('oracledb');

// Insert new passenger and return the generated ID
exports.registerPassenger = async (name, address) => {
  const connection = await getConnection();
  // Adjust SQL for your DB flavor (Oracle/MySQL/PostgreSQL)
  const result = await connection.execute(
   `INSERT INTO Passengers (PassengerId, Name, Address)
     VALUES (seq_PassengerId.NEXTVAL, :name, :address)
     RETURNING PassengerId INTO :id`,
    {name, address, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }},
    { autoCommit: true }
  );
  const passengerId = result.outBinds.id[0];
  await connection.close();
  return passengerId;
};