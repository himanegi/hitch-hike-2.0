import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  rideRequests: [rideRequestSchema],
});

export default mongoose.model("Trip", tripSchema);
