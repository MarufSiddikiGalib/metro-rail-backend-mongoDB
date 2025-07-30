const getConnection = require("../config/db");

exports.getAllDriver = async () => {
  const conn = await getConnection();
  const result = await conn.execute("SELECT * FROM Driver ORDER BY DriverId");
  await conn.close();
  return result.rows;
};

exports.createDriver = async (contactInfo,  experience, name, licenseNumber ) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO Driver (DriverId, ContactInfo,  Experience, Name, LicenseNumber)
     VALUES (seq_DriverId.NEXTVAL, :contactInfo, :experience, :name, :licenseNumber)`,
    [contactInfo,  experience, name, licenseNumber],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.updateDriver = async (id, contactInfo,  experience, name, licenseNumber) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `UPDATE Driver SET ContactInfo = :contactInfo, Experience = :experience, Name = :name, LicenseNumber = :licenseNumber WHERE DriverId = :id`,
    [ contactInfo,  experience, name, licenseNumber, id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};

exports.deleteDriver = async (id) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM Driver WHERE DriverId = :id`,
    [id],
    { autoCommit: true }
  );
  await conn.close();
  return result;
};
