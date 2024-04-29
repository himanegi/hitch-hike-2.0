import {
  createRideRequest,
  showRideRequests,
} from "../controllers/rideRequestController.js";
import express from "express";
const router = express.Router();

router.post("/create", createRideRequest);
router.post("/show", showRideRequests);

export default router;
