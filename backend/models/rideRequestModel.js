import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema({
  riderId: { type: String, ref: "Ride" },
  driverId: { type: String, ref: "Ride" },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});
export default mongoose.model("RideRequest", rideRequestSchema);
