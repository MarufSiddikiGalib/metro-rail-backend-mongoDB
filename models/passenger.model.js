const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  NAME: { type: String, required: true },
  ADDRESS: { type: String, required: true },
});

const Passenger = mongoose.model("Passenger", passengerSchema);

// Helper functions
async function getAllPassengers() {
  return await Passenger.find().sort({ _id: 1 });
}
async function createPassenger(NAME, ADDRESS) {
  const newPassenger = new Passenger({ NAME, ADDRESS });
  return await newPassenger.save();
}
async function updatePassenger(id, NAME, ADDRESS) {
  return await Passenger.findByIdAndUpdate(id, { NAME, ADDRESS }, { new: true });
}
async function deletePassenger(id) {
  return await Passenger.findByIdAndDelete(id);
}

module.exports = {
  Passenger,         // <-- The Mongoose model
  getAllPassengers,
  createPassenger,
  updatePassenger,
  deletePassenger,
};