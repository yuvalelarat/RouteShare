import express from "express";
import * as activityController from "../controllers/activityController.js";

const router = express.Router();

router.post("/new-activity/:journey_id", activityController.createActivity);
router.delete("/delete-activity/:activity_id", activityController.deleteActivity);
router.get("/all-activities/:journey_id", activityController.getActivitiesByJourneyId);
router.get("/all-activities-trip-id/:trip_id", activityController.getActivitiesByTripId);

export default router;
