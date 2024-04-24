// routes/trips.js
const express = require("express");
const router = express.Router();
const Trip = require("../models/tripModel");

router.post("/create", async (req, res) => {
  // Implement trip creation logic
});

router.get("/", async (req, res) => {
  // Implement logic to fetch user's trips
});

module.exports = router;
