import mongoose from "mongoose"

const rideSchema = new mongoose.Schema({
  source: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },

  date: Date,
  time: String,
  route: {
    type: {
      type: String,
      enum: ['LineString'],
    },
    coordinates: {
      type: [[Number]],
    }
  },
  message: String,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  riders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // Add other fields as needed
});

export default mongoose.model("Ride",rideSchema)
