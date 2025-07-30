const getConnection = require("../config/db");

exports.getAllTableCounts = async () => {
  const conn = await getConnection();
  try {
    // List of table names and their API property keys
    const tables = [
      { key: "zone", sql: "Zone" },
      { key: "staff", sql: "Staff" },
      { key: "driver", sql: "Driver" },
      { key: "passenger", sql: "Passengers" },
      { key: "transaction", sql: "TransactionTicket" },
      { key: "routeTrains", sql: "RouteTrains" },
      { key: "station", sql: "Station" },
      { key: "schedule", sql: "Schedule" },
      { key: "ticket", sql: "Ticket" },
    ];

    const stats = {};
    for (const table of tables) {
      try {
      console.log(`Querying table: ${table.sql}`);
      const result = await conn.execute(`SELECT COUNT(*) as count FROM ${table.sql}`);
      // If Oracle, result.rows[0][0]; if MySQL/Postgres, result[0].count or result.rows[0].count
      let count = 0;
      if (result.rows) {
        // Oracle-style
        count = result.rows[0][0];
      } else if (Array.isArray(result) && result.length > 0) {
        count = result[0].count;
      } else if (result[0] && result[0].count !== undefined) {
        count = result[0].count;
      }
      stats[table.key] = count;
    
  } catch (err) {
    console.error(`Error querying table ${table.sql}:`, err);
    throw err;
  }
    }


    await conn.close?.();
    return stats;
  } catch (err) {
    await conn.close?.();
    throw err;
  }
};