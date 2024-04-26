// routes/trips.js
import express from "express";
const router = express.Router();
import Trip from "../models/tripModel.js";

router.post("/create", async (req, res) => {
  // Implement trip creation logic
});

router.get("/", async (req, res) => {
  // Implement logic to fetch user's trips
});

export default router;
