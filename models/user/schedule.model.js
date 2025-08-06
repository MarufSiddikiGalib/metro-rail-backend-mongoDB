const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  arrivalTime: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  trainId: {
    type: String,// Assuming trainId is a string, you can change this to ObjectId if you have
    required: true,
  },
});

// Create the Schedule model (this will create the 'schedules' collection in MongoDB Atlas)
const Schedule = mongoose.model("Schedule", scheduleSchema);


exports.getAllSchedules = async () => {
  return await Schedule.find(
    {},
    "arrivalTime departureTime frequency trainId"
  )
    .sort({ arrivalTime: 1 }) // Sort by arrival time
    .lean();
};

module.exports = Schedule;