const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const rideRoutes = require("./routes/rides");
const tripRoutes = require("./routes/trips");

const app = express();
app.use(express.json());
app.use(cors());

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
