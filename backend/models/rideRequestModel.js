import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema({
  riderId: { type: String, ref: "User" },
  driverId: { type: String, ref: "User" },
  username: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  phoneNumber:{type:String},
  message:{type:String},  
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
});
export default mongoose.model("RideRequest", rideRequestSchema);
