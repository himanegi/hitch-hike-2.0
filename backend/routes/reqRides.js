import {
  createRideRequest,
  showRideRequests,
  changeRequestStatus,
} from "../controllers/rideRequestController.js";
import express from "express";
const router = express.Router();

router.post("/create", createRideRequest);
router.post("/show", showRideRequests);
router.post("/changeRequest", changeRequestStatus);

export default router;
