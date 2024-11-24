import express from "express";
import {
  createTrip,
  deleteTrip,
  getTrip,
  getAllTrips,
  editTrip,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/new-trip", createTrip);
router.delete("/delete-trip", deleteTrip);
router.get("/get-trip", getTrip);
router.get("/get-all-trips", getAllTrips);
router.patch("/edit-trip/:trip_id", editTrip);

export default router;
