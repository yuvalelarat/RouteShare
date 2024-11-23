import express from "express";
import {
  createTrip,
  deleteTrip,
  getTrip,
  editTrip,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/new-trip", createTrip);
router.delete("/delete-trip", deleteTrip);
router.get("/get-trip/:trip_id", getTrip);
router.patch("/trips/:trip_id", editTrip);

export default router;
