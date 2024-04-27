import Ride from "../models/rideModel.js";
import UserRide from "../models/userModel.js";
import * as turf from "@turf/turf";

const createRide = async (req, res) => {
  try {
    const { source, destination, date, time, message,driverId } = req.body;

    const sourcePoint = {
      type: "Point",
      coordinates: source,
    };

    const destinationPoint = {
      type: "Point",
      coordinates: destination,
    };

    const routeLine = {
      type: "LineString",
      coordinates: [source, destination],
    };

    const newRide = new Ride({
      source: sourcePoint,
      destination: destinationPoint,
      date,
      time,
      route: routeLine,
      message,
      driver:driverId,
    });

    await newRide.save();

    const newRideforUser = await UserRide.findOne({ user: driverId });
    if (newRideforUser) {
      newRideforUser.driving.push(newRide._id);
      await newRideforUser.save();
    } else {
      const newUserRide = new UserRide({
        user: driverId,
        driving: [newRide._id]
      });
      await newUserRide.save();
    }

    res.status(200).json({ message: "Ride created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the ride" });
  }
};
const searchRide = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const srcPt = turf.point(source);
    const destPt = turf.point(destination);
   
    const All_rides = await Ride.find({});
    const rides = All_rides.filter((ride) => {
      const line = turf.feature(ride.route);
      const srcDistance = turf.pointToLineDistance(srcPt, line, {
        units: "kilometers",
      });
      const destDistance = turf.pointToLineDistance(destPt, line, {
        units: "kilometers",
      });
      return srcDistance < 5 && destDistance < 5;
    });

    if (rides.length > 0) {
      res.status(200).json({ message: "Search Result", rides });
      console.log(rides)
    } else {
      res.status(200).json({ message: "No rides found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while searching for rides" });
  }
};

export { createRide, searchRide };
