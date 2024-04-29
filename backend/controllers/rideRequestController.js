import RideRequest from "../models/rideRequestModel.js";

const createRideRequest = async (req, res) => {
  try {
    const { rider, driver, username } = req.body;
    console.log("my name", username);
    const newRideRequest = new RideRequest({
      riderId: rider,
      driverId: driver,
      username: username,
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
    console.log("req.user._id: ", req.body.userId);
    const rideRequests = await RideRequest.find({ driverId: req.body.userId });
    console.log("rideRequests: ", rideRequests);
    res.status(200).json(rideRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { createRideRequest, showRideRequests };
