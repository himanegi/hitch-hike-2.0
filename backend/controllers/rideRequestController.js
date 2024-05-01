import rideModel from "../models/rideModel.js";

const createRideRequest = async (req, res) => {
  try {
    const { rideId, username, rider } = req.body;
    const ride = await rideModel.findById(rideId);
    if (ride.spotsLeft == 0) {
      return res.status(201).json({ message: "sorry no spots left" });
    }
    const alreadyRequested = ride.rideRequests.some((request) => {
      return request.riderId == rider;
    });
    if (alreadyRequested) {
      return res.status(201).json({ message: "Request already sent" });
    }

    ride.rideRequests.push({ riderId: rider, username: username });
    console.log("ride: ", ride.rideRequests);

    await ride.save(); //this was the issue
    res.status(201).json({ message: "Request sent" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const showRideRequests = async (req, res) => {
  // try {
  //   console.log("req.user._id: ", req.body.userId);
  //   const {rideRequests} = await rideModel.find({ driver: req.body.userId });
  //   console.log("rideRequests: ", rideRequests);
  //   res.status(200).json(rideRequests);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

export { createRideRequest, showRideRequests };
