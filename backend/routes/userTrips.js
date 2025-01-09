import express from "express";
const router = express.Router();
import { showRides } from "../controllers/tripController.js";

router.post("/", showRides);

export default router;
