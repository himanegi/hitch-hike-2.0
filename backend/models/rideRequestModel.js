import mongoose from 'mongoose';

const rideRequestSchema = mongoose.Schema({

        riderId: { type: String, ref: "User" },
        driverId: { type: String, ref: "User" },
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: "Pending" },

})
export default mongoose.model('RideRequest', rideRequestSchema);    