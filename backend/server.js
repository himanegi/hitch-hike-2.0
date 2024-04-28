import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import rideRoutes from "./routes/rides.js";
import userTripRoutes from "./routes/userTrips.js";
import reqRide from "./routes/reqRides.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/rides", rideRoutes);
app.use("/api/rideRequests", reqRide);
app.use("/api/trips", userTripRoutes);

app

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
