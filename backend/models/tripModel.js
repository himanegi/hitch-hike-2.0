import mongoose from 'mongoose';

const rideRequestSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String },
},{_id: false});

const tripSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Ride'},
  rideRequests: [rideRequestSchema],
  // Add other fields as needed
});

export default mongoose.model('Trip', tripSchema);