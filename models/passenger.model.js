const mongoose = require("mongoose");

// Mongoose schema for Passengers
const passengerSchema = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
  },
  ADDRESS: {
    type: String,
    required: true,
  },
});

// Model: Passenger
const Passenger = mongoose.model("Passenger", passengerSchema);

// 🔁 Get all passengers, sorted by creation order
exports.getAllPassengers = async () => {
  return await Passenger.find().sort({ _id: 1 });
};

// 🆕 Create a new passenger
exports.createPassenger = async (NAME, ADDRESS) => {
  const newPassenger = new Passenger({ NAME, ADDRESS });
  return await newPassenger.save();
};

// ✏️ Update a passenger by ID
exports.updatePassenger = async (id, NAME, ADDRESS) => {
  return await Passenger.findByIdAndUpdate(
    id,
    { NAME, ADDRESS },
    { new: true }
  );
};

// ❌ Delete a passenger by ID
exports.deletePassenger = async (id) => {
  return await Passenger.findByIdAndDelete(id);
};