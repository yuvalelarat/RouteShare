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

    const trip = await dataSource.getRepository(Trip).findOne({
      where: { trip_id },
      relations: ["user", "participants", "participants.user"],
    });

    const entitiesNotFound = await checkIfEntitiesExist([trip], ["Trip"], res);
    if (entitiesNotFound) return;

    if (trip.user && trip.user.user_id !== user_id) {
      const participant = trip.participants.find(
        (p) => p.user && p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to add a journey to this trip",
        });
      }
    }

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
      relations: [
        "trip",
        "trip.user",
        "trip.participants",
        "trip.participants.user",
      ],
    });

    const entitiesNotFound = await checkIfEntitiesExist(
      [journey],
      ["Journey"],
      res
    );
    if (entitiesNotFound) return;

    if (journey.trip.user.user_id !== user_id) {
      const participant = journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to delete this journey",
        });
      }
    }

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

//edit journey
router.patch("/edit-journey", async (req, res) => {
  const { journey_id, day_number, country, description } = req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const requiredFields = { journey_id };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const journey = await journeyRepository.findOne({
      where: { journey_id },
      relations: [
        "trip",
        "trip.user",
        "trip.participants",
        "trip.participants.user",
      ],
    });

    const entitiesNotFound = await checkIfEntitiesExist(
      [journey],
      ["Journey"],
      res
    );
    if (entitiesNotFound) return;

    if (journey.trip.user.user_id !== user_id) {
      const participant = journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to edit this journey",
        });
      }
    }

    if (day_number && day_number !== journey.day_number) {
      const conflictingJourney = await journeyRepository.findOne({
        where: { trip: { trip_id: journey.trip.trip_id }, day_number },
      });

      if (conflictingJourney) {
        return res.status(400).json({
          success: false,
          message: `A journey already exists for day ${day_number} in this trip.`,
        });
      }
    }

    if (day_number !== undefined) journey.day_number = day_number;
    if (country !== undefined) journey.country = country;
    if (description !== undefined) journey.description = description;

    const updatedJourney = await journeyRepository.save(journey);

    res.status(200).json({
      success: true,
      message: "Journey updated successfully",
      journey: updatedJourney,
    });
  } catch (err) {
    console.error("Error editing journey:", err);
    res.status(500).json({
      success: false,
      message: "Error editing journey",
      error: err.message,
    });
  }
});


export default router;
