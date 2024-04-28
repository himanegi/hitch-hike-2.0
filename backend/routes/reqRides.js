import { createRideRequest,showRideRequests} from "../controllers/rideRequestController.js";
import express from "express";
const router = express.Router();

router.post("/rideRequest", createRideRequest);
router.get("/rideRequests", showRideRequests);

export default router;

