// routes/trips.js
import express from "express";
const router = express.Router();
import { showRides } from "../controllers/tripController.js";
router.post("/create", async (req, res) => {
  // Implement trip creation logic
});

router.post("/", showRides);

export default router;
