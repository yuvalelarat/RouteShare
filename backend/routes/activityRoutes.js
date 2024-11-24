import express from "express";
import {
  createActivity,
  deleteActivity,
  updateActivity,
  getActivitiesByJourneyId
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/new-activity/:journey_id", createActivity);
router.delete("/delete-activity/:activity_id", deleteActivity);
router.patch("/edit-activity/:activity_id", updateActivity);
router.get("/all-activities/:journey_id", getActivitiesByJourneyId);

export default router;
