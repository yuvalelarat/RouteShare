import express from "express";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

router.post("/new-trip", tripController.createTrip);
router.delete("/delete-trip", tripController.deleteTrip);
router.get("/get-trip", tripController.getTrip);
router.get("/get-all-trips", tripController.getAllTrips);
router.patch("/edit-trip/:trip_id", tripController.editTrip);

export default router;
