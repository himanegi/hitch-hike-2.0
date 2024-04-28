import rideRequestModel from "../models/rideRequestModel.js";

const createRideRequest = async (req, res) => {
    try {
       const {rider,driver} = req.body;
         const newRideRequest = new rideRequestModel({
              rider,
              driver
            });
        await newRideRequest.save();
        res.status(201).json({ newRideRequest });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const showRideRequests = async (req, res) => {
    try {
        const rideRequests = await rideRequestModel.find({ driver: req.user._id });
        res.status(200).json(rideRequests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {createRideRequest,showRideRequests};
