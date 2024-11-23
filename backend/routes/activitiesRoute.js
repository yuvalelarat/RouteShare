import express from "express";
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/new-activity/:journey_id", createActivity);
router.delete("/delete-activity/:activity_id", deleteActivity);
router.patch("/edit-activity/:activity_id", updateActivity);

export default router;
