// routes/rides.js
import express from "express";

import { createRide, searchRide } from "../controllers/rideController.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/create",createRide);
=======
router.post("/create", createRide);
>>>>>>> b9209ec3d5fccadb33c5e6567357e0885578d4a8
router.post("/search", searchRide);

export default router;
