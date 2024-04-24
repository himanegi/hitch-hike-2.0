const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  driving: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  // Add other fields as needed
});

module.exports = mongoose.model("Trip", tripSchema);
