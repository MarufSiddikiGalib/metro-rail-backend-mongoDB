require('dotenv').config();
const dotenv = require("dotenv");
const oracledb = require("oracledb");



// Enable Thick mode (REQUIRED for Oracle 10g)
oracledb.initOracleClient({
    libDir: "C:\\oracle\\instantclient-basic-windows\\instantclient_23_8"
  });

// Oracle DB connection details
const dbConfig = {
    user: process.env.DB_USER ,
    password: process.env.DB_PASS,
    connectString: process.env.DB_CONN  // or "127.0.0.1:1521/XE"
  };
  
 // Reusable connection function
async function getConnection() {
    return await oracledb.getConnection(dbConfig);
  }
  
   
  module.exports = getConnection;

