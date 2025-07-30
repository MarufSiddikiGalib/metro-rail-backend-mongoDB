const oracledb = require("oracledb");
//const dbConfig = require("../config/db");
const getConnection = require("../config/db"); //But earlier in your project, you moved the connection logic into config/db.js as a function (following thick mode).
//You should not pass dbConfig directly anymore. Instead, you need to do that

exports.findByUsername = async (username) => {
  //const connection = await oracledb.getConnection(dbConfig);
  const connection = await getConnection(); // ✅ use function not object
  const result = await connection.execute(
    "SELECT * FROM Admin WHERE Username = :username",
    [username]
  );
  await connection.close();
  return result.rows[0];
};

exports.createAdmin = async (username, hashedPassword) => {
  //const connection = await oracledb.getConnection(dbConfig);
  const connection = await getConnection(); // ✅ use function not object
  await connection.execute(
    "INSERT INTO Admin (AdminId, Username, Password) VALUES (seq_AdminId.NEXTVAL, :username, :password)",
    [username, hashedPassword],
    { autoCommit: true }
  );
  await connection.close();
};
