const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  source: String,
  destination: String,
  date: Date,
  time: String,
  message: String,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  riders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // Add other fields as needed
});

module.exports = mongoose.model("Ride", rideSchema);
