import { Router } from "express";
import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import {
  checkIfEntitiesExist,
  checkRequiredFields,
  getUserIdFromToken,
} from "../helpers/errorHelpers.js";
import { TripParticipant } from "../models/tripParticipant.js";

const router = Router();
const tripRepository = dataSource.getRepository(Trip);

//create trip
router.post("/new-trip", async (req, res) => {
  const { trip_name, start_date, end_date, description } = req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const validationError = checkRequiredFields(
      { trip_name, start_date, end_date },
      res
    );
    if (validationError) return validationError;

    const user = await dataSource.getRepository(User).findOneBy({ user_id });
    const entitiesNotFound = await checkIfEntitiesExist([user], ["User"], res);
    if (entitiesNotFound) return;

    const existingTrip = await tripRepository.findOneBy({ user: { user_id } });
    if (existingTrip) {
      return res.status(403).json({
        success: false,
        message: "User already has a trip. Cannot create another trip.",
      });
    }

    const newTrip = tripRepository.create({
      user,
      trip_name,
      start_date,
      end_date,
      description,
    });

    const savedTrip = await tripRepository.save(newTrip);

    const tripParticipantRepository = dataSource.getRepository(TripParticipant);
    const newParticipant = tripParticipantRepository.create({
      trip: savedTrip,
      user,
      role: "admin",
    });

    await tripParticipantRepository.save(newParticipant);

    res.status(201).json({
      success: true,
      trip: {
        ...savedTrip,
        user: {
          user_id: savedTrip.user.user_id,
          email: savedTrip.user.email,
        },
        participants: [
          {
            trip_participant_id: newParticipant.trip_participant_id,
            user_id: newParticipant.user.user_id,
            role: newParticipant.role,
          },
        ],
      },
    });
  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({
      success: false,
      message: "Error creating trip",
      error: err.message,
    });
  }
});

//get trip by id
router.get("/get-trip/:trip_id", async (req, res) => {
  const { trip_id } = req.params;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const trip = await dataSource.getRepository(Trip).findOne({
      where: { trip_id },
      relations: ["user", "participants", "participants.user"],
    });

    const entitiesNotFound = await checkIfEntitiesExist([trip], ["Trip"], res);
    if (entitiesNotFound) return;

    if (trip.user.user_id !== user_id) {
      const participant = trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || !["view", "edit"].includes(participant.role)) {
        return res.status(403).json({
          success: false,
          message:
            "You must be a participant with 'view' or 'edit' role to access this trip",
        });
      }
    }

    res.status(200).json({
      success: true,
      trip: {
        ...trip,
        user: {
          user_id: trip.user.user_id,
          email: trip.user.email,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching trip",
      error: err.message,
    });
  }
});

//delete trip
router.delete("/delete-trip", async (req, res) => {
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const trip = await tripRepository.findOne({
      where: { user: { user_id } },
      relations: ["user"],
    });

    const entitiesNotFound = await checkIfEntitiesExist([trip], ["Trip"], res);
    if (entitiesNotFound) return;

    if (trip.user.user_id !== user_id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own trips",
      });
    }

    await tripRepository.delete(trip.trip_id);

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting trip",
      error: err.message,
    });
  }
});

export default router;
