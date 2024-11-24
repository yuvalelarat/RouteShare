import express from "express";
import * as journeyController from "../controllers/journeyController.js";

const router = express.Router();

router.post("/new-journey", journeyController.createJourney);
router.delete("/delete-journey", journeyController.deleteJourney);
router.patch("/edit-journey", journeyController.editJourney);
router.get("/all-journeys/:trip_id", journeyController.getAllJourneys);

export default router;
