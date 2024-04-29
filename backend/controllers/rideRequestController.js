import RideRequest from "../models/rideRequestModel.js";

const createRideRequest = async (req, res) => {
  try {
    const { rider, driver } = req.body;
    const newRideRequest = new RideRequest({
      riderId: rider,
      driverId: driver,
    });
    console.log("newRideRequest: ", newRideRequest);
    await newRideRequest.save();
    res.status(201).json({ newRideRequest });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const showRideRequests = async (req, res) => {
  try {
    const rideRequests = await RideRequest.find({ driverId: req.body.userId });
    res.status(200).json(rideRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { createRideRequest, showRideRequests };
