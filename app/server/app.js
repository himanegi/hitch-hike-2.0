const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Carpooling app listening at http://localhost:${port}`);
});

mongoose
  .connect("mongodb://localhost/carpooling", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/ride-request", (req, res) => {
  // Handle sending a ride request
});

app.get("/ride-requests", (req, res) => {
  // Fetch ride requests for a user
});

app.put("/ride-request/:id", (req, res) => {
  // Handle a rider responding to a ride request
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
