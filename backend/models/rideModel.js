import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema(
  {
    riderId: { type: String },
    username: { type: String },
    riderSource: { type: String },
    riderDestination: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    phoneNumber: { type: String },
    message: { type: String },
  },
  { _id: false }
);

const rideSchema = new mongoose.Schema({
  source: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  destination: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },

  date: Date,
  time: String,
  ridePath: {
    type: {
      type: String,
      enum: ["LineString"],
      default: "LineString"
    },
    coordinates: {
      type: [[Number]], // array of [lon, lat] pairs
      default: []
    }
  },
  sourceName: String,
  destinationName: String,
  totalDist: Number,
  message: String,
  driver: { type: String, ref: "User" },
  driverName: String,
  riders: [rideRequestSchema],
  rideRequests: [rideRequestSchema],
  spotsLeft: { type: Number },
  // Add other fields as needed
});

export default mongoose.model("Ride", rideSchema);
