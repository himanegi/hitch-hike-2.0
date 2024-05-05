import Ride from "../models/rideModel.js";
import UserRide from "../models/userModel.js";
import * as turf from "@turf/turf";
//Implementing the HaverSine distance calculation function

const toRadians = (deg) => {
  return deg * (Math.PI / 180);
};

const haversineDistance = (pt1, pt2) => {
  const earthRadius = 6371; // in kilometers

  const [lat1, lon1] = pt1;
  const [lat2, lon2] = pt2;
  console.log(lat1, lon1, lat2, lon2);
  const latDif = toRadians(lat2 - lat1);
  const lonDif = toRadians(lon2 - lon1);

  const a = //sin^2((x2-x1)/2)+cos(x1)*cos(x2)*sin^2((y2-y1)/2)
    Math.pow(Math.sin(latDif / 2), 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.pow(Math.sin(lonDif / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a)); //arctangent is used to get angle from tangent

  const dist = earthRadius * c;

  return dist;
};

const createRide = async (req, res) => {
  console.log("aagaya")
  try {
    const {
      
      source,
      destination,
      date,
      time,
      message,
      driverId,
      sourceName,
      destinationName,
      ridePath,
      driverName,
      spotsInCar,
      distance,
    } = req.body;
console.log("this",req.body);
    const sourcePoint = {
      type: "Point",
      coordinates: source,
    };

    const destinationPoint = {
      type: "Point",
      coordinates: destination,
    };

    // const routeLine = dijkstra(sourcePoint,destinationPoint);
    // console.log(routeLine);
    const routeLine = ridePath;

    // const totalDist = haversineDistance(source, destination);
    const totalDist=distance
    console.log(totalDist);

    const newRide = new Ride({
      source: sourcePoint,
      destination: destinationPoint,
      sourceName,
      destinationName,
      date,
      time,
      ridePath: {
        type: "LineString",
        coordinates: ridePath
      },
      message,
      driver: driverId,
      driverName,
      totalDist: distance,
      spotsLeft: spotsInCar,
    });

    // console.log("new ride: ", spotsInCar, newRide.spotsLeft);
    await newRide.save();
    const newRideforUser = await UserRide.findOne({ user: driverId });
    if (newRideforUser) {
      newRideforUser.driving.push(newRide._id);
      await newRideforUser.save();
    } else {
      const newUserRide = new UserRide({
        user: driverId,
        driving: [newRide._id],
      });
      await newUserRide.save();
    }

    res.status(200).json({ message: "Ride created successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the ride" });
  }
};

const distanceFromPoint = (point, line) => {
  return turf.pointToLineDistance(point, line, {
    units: "kilometers",
  });
};

const getAngle = (l1, l2) => {
  const rideDirection = turf.bearing(l1.coordinates[0], l1.coordinates[1]);
  const searchDirection = turf.bearing(l2.coordinates[0], l2.coordinates[1]);
  return Math.abs(rideDirection - searchDirection);
};

const searchRide = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { source, destination } = req.body;
    // const line2 = {
    //   type: "LineString",
    //   coordinates: [source, destination],
    // };
    // const srcPt = turf.point(source);
    // const destPt = turf.point(destination);
    // const All_rides = await Ride.find({});

    // const rides = await All_rides.filter((ride) => {
    //   const thresholdDistance = ride.totalDist / 10;
    //   let srcClosest = null;
    //   let destClosest = null;

    //   for (let i = 0; i < ride.route.length - 1; i++) {
    //     const line = [ride.route[i], ride.route[i + 1]];

    //     const srcDistance = distanceFromPoint(srcPt, line);
    //     if (srcDistance < thresholdDistance) {
    //       srcClosest = ride.route[i];
    //     }

    //     const destDistance = distanceFromPoint(destPt, line);
    //     if (destDistance < thresholdDistance) {
    //       destClosest = ride.route[i];
    //     }
    //   }

    //   if (srcClosest && destClosest) {
    //     const rideDirection = [srcClosest, destClosest];
    //     const srcDestDirection = [source, destination];
    //     const angle = getAngle(rideDirection, srcDestDirection);

    //     if (angle < 15) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });

    const All_rides = await Ride.find({});

    const rides = await All_rides.filter((ride) => { 
      for (let i = 0; i < ride.ridePath.coordinates.length; i++) {
       
        if (ride.ridePath.coordinates[i][0] === source[0] && ride.ridePath.coordinates[i][1] === source[1]) {
        
          for (let j = i; j < ride.ridePath.coordinates.length; j++) {
            if (
              ride.ridePath.coordinates[j][0] === destination[0] &&
              ride.ridePath.coordinates[j][1] === destination[1]
            ) {
              return true;
            }
          }
        }
      }
      return false;
    });

    if (rides.length > 0) {
      res.status(200).json({ message: "Search Result", rides });
      console.log(rides);
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

const deleteRide = async (req, res) => {
  try {
    const { rideId, riderId } = req.body;
    console.log("hello ride : ", rideId, riderId);
    const ride = await Ride.findById(rideId);
    const newRideRequest = ride.rideRequests.filter((request) => {
      return request.riderId != riderId;
    });
    ride.rideRequests = newRideRequest;
    await ride.save();
    const user = await UserRide.findOne({ user: riderId });
    const newRideRequestforUser = user.rides.filter((ride) => {
      return ride != rideId;
    });
    user.rides = newRideRequestforUser;
    await user.save();
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the ride" });
  }
};

export { createRide, searchRide, deleteRide };
