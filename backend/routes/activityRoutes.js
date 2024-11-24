import express from "express";
import * as activityController from "../controllers/activityController.js";

const router = express.Router();

router.post("/new-activity/:journey_id", activityController.createActivity);
router.delete("/delete-activity/:activity_id", activityController.deleteActivity);
router.patch("/edit-activity/:activity_id", activityController.updateActivity);
router.get("/all-activities/:journey_id", activityController.getActivitiesByJourneyId);

export default router;
