const mongoose = require("mongoose");

// Define Passenger schema for MongoDB
const passengerSchema = new mongoose.Schema({
  NAME: { type: String, required: true },
  ADDRESS: { type: String, required: true },
}, { collection: "passengers" });

// Create Passenger model
const Passenger = mongoose.models.Passenger || mongoose.model("Passenger", passengerSchema);

// Register a new passenger and return the generated _id
exports.registerPassenger = async (NAME, ADDRESS) => {
  const passenger = new Passenger({ NAME, ADDRESS });
  const saved = await passenger.save();
  // Return MongoDB _id as passengerId (string)
  return saved._id.toString();
};

exports.Passenger = Passenger;