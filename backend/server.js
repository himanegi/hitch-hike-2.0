import express from "express"
import mongoose from  "mongoose";
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import rideRoutes from "./routes/rides.js";
import tripRoutes from "./routes/trips.js";

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin:"https://localhost/3000"
  }
));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/rides", rideRoutes);

app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
