import userTrip from "../models/userModel.js";

const showRides = async (req, res) => {
  try {
    const allRides = await userTrip
      .find({ user: req.body.userId })
      .populate("driving");
    console.log(allRides[0].driving);
    if (allRides.length > 0) {
      res.status(200).json({ message: "All Rides", allRides });
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

export { showRides };
