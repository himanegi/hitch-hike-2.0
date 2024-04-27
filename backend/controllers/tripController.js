import userTrip from "../models/userModel.js";

const showRides=async(req,res)=>
{console.log(req.body)
    try{
const rides=await userTrip.findOne({user:req.userId})
if (rides > 0) {
    res.status(200).json({ message: "All Rides", rides });
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
}

export {showRides} 