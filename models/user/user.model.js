const getConnection = require("../../config/db");

// Find user by username
exports.findByUsername = async (username) => {
  const connection = await getConnection();
  const result = await connection.execute(
    'SELECT * FROM "User" WHERE Username = :username',
    [username]
  );
  await connection.close();
  return result.rows[0];
};

// Create a new user
exports.createUser = async (username, hashedPassword) => {
  const connection = await getConnection();
  await connection.execute(
    'INSERT INTO "User" (UserId, Username, Password) VALUES (seq_UserId.NEXTVAL, :username, :password)',
    [username, hashedPassword],
    { autoCommit: true }
  );
  await connection.close();
};