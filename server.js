const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const oracledb = require("oracledb");
const getConnection = require("./config/db"); // ✅ use new config

const staffRoutes = require("./routes/staff.routes");
const adminAuthRoutes = require("./routes/auth.routes");
const userAuthRoutes = require("./routes/user/auth.routes"); // <== User Auth routes
const dashboardRoutes = require("./routes/dashboard.routes"); 
const zoneRoutes = require("./routes/zone.routes"); // ✅ Zone routes
const driverRoutes = require("./routes/driver.routes"); // ✅ Driver routes
const passengerRoutes = require("./routes/passenger.routes"); // ✅ Passenger routes
const stationRoutes = require("./routes/user/station.routes"); // <== Station routes
const fareRoutes = require("./routes/user/fare.routes"); // <== User Fare routes
const passengerRegRoutes = require("./routes/user/passenger.routes"); // Passenger resistration while buying a ticket
const ticketRoutes = require("./routes/user/ticket.routes"); // <== User Fare routes
const ticketPdfRoutes = require("./routes/user/ticketPdf.routes"); // <== User Ticket PDF routes
const TrainRoutes = require("./routes/train.routes"); // ✅ Train routes
const StationRoutes = require("./routes/station.routes"); // ✅ station routes
const TicketRoutes = require("./routes/ticket.routes"); // <== admin Ticket routes
const transactionRoutes = require("./routes/user/transaction.routes"); // <== Transaction routes




const app = express();
const PORT = 8000;
dotenv.config();

app.use(cors());
app.use(express.json());


app.use("/api/staff", staffRoutes); // ✅ Mount staff routes
app.use("/api/admin", adminAuthRoutes); // <== Admin Auth routes
app.use("/api/user", userAuthRoutes); // <== User Auth routes
app.use("/api", dashboardRoutes); // ✅ Dashboard routes
app.use("/api/zone", zoneRoutes); // ✅ Zone routes
app.use("/api/driver", driverRoutes); // ✅ Driver routes
app.use('/api/passenger', passengerRoutes); // ✅ Passenger routes);
app.use("/api/stations", stationRoutes); // <== User Station routes
app.use("/api/fare", fareRoutes); // <== User Fare routes
app.use("/api/passenger-registration", passengerRegRoutes); // <== Passenger registration routes
app.use("/api/ticket", ticketRoutes); // <== User Ticket routes
app.use("/api/ticket", ticketPdfRoutes); // <== User Ticket PDF routes
app.use("/api/train", TrainRoutes); // ✅ Train routes
app.use("/api/station", StationRoutes); // ✅ Station routes
app.use("/api/tickets", TicketRoutes); // <== admin Ticket routes
app.use("/api/transactions", transactionRoutes); // <== Transaction routes

  // Test route
  // app.get("/api/tickets", async (req, res) => {
  //   let connection;
  
  //   try {
  //     connection = await getConnection();
  //     const result = await connection.execute("SELECT * FROM ticket"); 
  //   } catch (err) {
  //     console.error("DB error:", err);
  //     res.status(500).json({ error: err.message });
  //   } finally {
  //     if (connection) {
  //       try {
  //         await connection.close();
  //       } catch (err) {
  //         console.error("Error closing connection:", err);
  //       }
  //     }
  //   }
  // });
  

app.get("/api/home", (req, res) => {
    res.json({message: "Hello server"});
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});