import express from "express";
import {
  createJourney,
  deleteJourney,
  editJourney,
  getAllJourneys,
} from "../controllers/journeyController.js";

const router = express.Router();

router.post("/new-journey", createJourney);
router.delete("/delete-journey", deleteJourney);
router.patch("/edit-journey", editJourney);
router.get("/all-journeys/:trip_id", getAllJourneys);

export default router;
