// routes/rides.js
import express from "express";

import { createRide, searchRide,deleteRide } from "../controllers/rideController.js";

const router = express.Router();

router.post("/create", createRide);
router.post("/search", searchRide);
router.post("/delete", deleteRide);

export default router;
