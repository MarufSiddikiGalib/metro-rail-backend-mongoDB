// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });


const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;













// require('dotenv').config();
// const dotenv = require("dotenv");
// const oracledb = require("oracledb");



// // Enable Thick mode (REQUIRED for Oracle 10g)
// oracledb.initOracleClient({
//     libDir: "C:\\oracle\\instantclient-basic-windows\\instantclient_23_8"
//   });

// // Oracle DB connection details
// const dbConfig = {
//     user: process.env.DB_USER ,
//     password: process.env.DB_PASS,
//     connectString: process.env.DB_CONN  // or "127.0.0.1:1521/XE"
//   };
  
//  // Reusable connection function
// async function getConnection() {
//     return await oracledb.getConnection(dbConfig);
//   }
  
   
//   module.exports = getConnection;

