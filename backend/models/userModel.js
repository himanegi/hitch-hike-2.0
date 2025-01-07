import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  driving: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
});

export default mongoose.model("UserRide", userSchema);
