import rideModel from "../models/rideModel.js";
import userModel from "../models/userModel.js";

const createRideRequest = async (req, res) => {
  try {
    const {
      rideId,
      username,
      rider,
      phoneNumber,
      message,
      riderSource,
      riderDestination,
    } = req.body;
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

    ride.rideRequests.push({
      riderId: rider,
      username: username,
      phoneNumber: phoneNumber,
      message: message,
      riderSource: riderSource,
      riderDestination: riderDestination,
    });

    console.log("ride: ", ride.rideRequests);

    await ride.save(); //this was the issue

    const user = await userModel.findOne({ user: rider });
    if (user) {
      user.rides.push(rideId);
      await user.save();
    } else {
      const newUser = new userModel({ user: rider, rides: [rideId] });
      await newUser.save();
    }

    res.status(201).json({ message: "Request sent" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const showRideRequests = async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await rideModel.findById(rideId);
    const rideRequests = ride.rideRequests;
    res.status(200).json(rideRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const changeRequestStatus = async (req, res) => {
  const { status, rideId, rider } = req.body;
  const ride = await rideModel.findById(rideId);
  const rideRequestofThatPerson = ride.rideRequests.find(
    (riderId) => riderId.riderId == rider
  );
  console.log("rideRequestofThatPerson: ", rideRequestofThatPerson);
  rideRequestofThatPerson.status = status;
  if (status == "accepted") {
    ride.riders.push(rideRequestofThatPerson);
    ride.spotsLeft = ride.spotsLeft - 1;
    // if(ride.spotsLeft==0)
    // {
    //   // Delete the ride
    //   console.log(ride.id)
    //   await rideModel.findByIdAndDelete(ride.id);
    // }
  }
    
  await ride.save();
  res.status(201).json({ message: "Done", rideRequests: ride.rideRequests });
};

export { createRideRequest, showRideRequests, changeRequestStatus };
