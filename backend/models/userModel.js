import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  driving: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  // Add other fields as needed
});

export default mongoose.model("UserRide", userSchema);
