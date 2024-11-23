import { Router } from "express";
import { Journey } from "../models/journey.js";
import { Trip } from "../models/trip.js";
import dataSource from "../db/connection.js";
import {
  checkIfEntitiesExist,
  checkRequiredFields,
  getUserIdFromToken,
} from "../helpers/errorHelpers.js";

const router = Router();
const journeyRepository = dataSource.getRepository(Journey);

//create journey
router.post("/new-journey", async (req, res) => {
  const { trip_id, day_number, country, description } = req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const requiredFields = { trip_id, day_number, country };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const trip = await dataSource.getRepository(Trip).findOneBy({ trip_id });
    const entitiesNotFound = checkIfEntitiesExist([trip], ["Trip"], res);
    if (entitiesNotFound) return;

    const existingJourney = await journeyRepository.findOne({
      where: { trip: { trip_id }, day_number },
    });

    if (existingJourney) {
      return res.status(400).json({
        success: false,
        message: `A journey already exists for day ${day_number} in this trip.`,
      });
    }

    const newJourney = journeyRepository.create({
      trip: { trip_id, user_id },
      day_number,
      country,
      description,
    });

    const savedJourney = await journeyRepository.save(newJourney);

    res.status(201).json({ success: true, journey: savedJourney });
  } catch (err) {
    console.error("Error creating journey:", err);
    res.status(500).json({
      success: false,
      message: "Error creating journey",
      error: err.message,
    });
  }
});

//delete journey
router.delete("/delete-journey", async (req, res) => {
  try {
    const { journey_id } = req.body;

    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const requiredFields = { journey_id };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const journey = await journeyRepository.findOne({
      where: { journey_id },
      relations: ["trip"],
    });

    const entitiesNotFound = checkIfEntitiesExist([journey], ["Journey"], res);
    if (entitiesNotFound) return;

    await journeyRepository.delete(journey_id);

    res.status(200).json({
      success: true,
      message: "Journey deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting journey:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting journey",
      error: err.message,
    });
  }
});

export default router;
