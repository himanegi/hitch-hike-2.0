// routes/rides.js
import express from "express";

import { createRide, searchRide } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.post("/search", searchRide);

export default router;
