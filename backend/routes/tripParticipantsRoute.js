import { Router } from "express";
import { TripParticipant } from "../models/tripParticipant.js";
import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import {
  checkIfEntitiesExist,
  checkRequiredFields,
  getUserIdFromToken,
} from "../helpers/errorHelpers.js";

const router = Router();
const tripParticipantRepository = dataSource.getRepository(TripParticipant);

//add participant
router.post("/add-participant", async (req, res) => {
  const { trip_id, email, role } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email, role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const trip = await dataSource.getRepository(Trip).findOne({
      where: { trip_id },
      relations: ["user"],
    });
    const user = await dataSource.getRepository(User).findOneBy({ email });

    const entitiesNotFound = await checkIfEntitiesExist(
      [trip, user],
      ["Trip", "User"],
      res
    );
    if (entitiesNotFound) return;

    if (trip.user.user_id !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add participants to this trip.",
      });
    }

    const existingParticipant = await tripParticipantRepository.findOne({
      where: { trip: { trip_id }, user: { user_id: user.user_id } },
    });

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: "User is already a participant in this trip.",
      });
    }

    const newTripParticipant = tripParticipantRepository.create({
      trip,
      user,
      role,
      expenses: 0,
    });

    const savedParticipant = await tripParticipantRepository.save(
      newTripParticipant
    );

    res.status(201).json({
      success: true,
      message: "User added as participant",
      participant: {
        trip: { trip_id: savedParticipant.trip.trip_id },
        user: {
          user_id: savedParticipant.user.user_id,
          email: savedParticipant.user.email,
        },
        role: savedParticipant.role,
        expenses: savedParticipant.expenses,
      },
    });
  } catch (err) {
    console.error("Error adding participant:", err);
    res.status(500).json({
      success: false,
      message: "Error adding participant",
      error: err.message,
    });
  }
});

//remove participant
router.delete("/remove-participant", async (req, res) => {
  const { trip_id, email } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const trip = await dataSource.getRepository(Trip).findOne({
      where: { trip_id },
      relations: ["user"],
    });

    const user = await dataSource.getRepository(User).findOneBy({ email });

    const entitiesNotFound = await checkIfEntitiesExist(
      [trip, user],
      ["Trip", "User"],
      res
    );
    if (entitiesNotFound) return;

    if (trip.user.user_id !== currentUserId) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to remove participants from this trip.",
      });
    }

    if (trip.user.user_id === user.user_id) {
      return res.status(403).json({
        success: false,
        message: "The trip creator cannot remove themselves as a participant.",
      });
    }

    const existingParticipant = await tripParticipantRepository.findOne({
      where: { trip: { trip_id }, user: { user_id: user.user_id } },
    });

    if (!existingParticipant) {
      return res.status(404).json({
        success: false,
        message: "User is not a participant in this trip.",
      });
    }

    await tripParticipantRepository.delete({
      trip: { trip_id },
      user: { user_id: user.user_id },
    });

    res.status(200).json({
      success: true,
      message: "User removed as participant.",
    });
  } catch (err) {
    console.error("Error removing participant:", err);
    res.status(500).json({
      success: false,
      message: "Error removing participant",
      error: err.message,
    });
  }
});

router.patch("/edit-participant-role", async (req, res) => {
  const { trip_id, email, new_role } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email, new_role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const trip = await dataSource.getRepository(Trip).findOne({
      where: { trip_id },
      relations: ["user"],
    });

    const user = await dataSource.getRepository(User).findOneBy({ email });

    const entitiesNotFound = await checkIfEntitiesExist(
      [trip, user],
      ["Trip", "User"],
      res
    );
    if (entitiesNotFound) return;

    if (trip.user.user_id !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit participants for this trip.",
      });
    }

    if (trip.user.user_id === user.user_id) {
      return res.status(403).json({
        success: false,
        message: "The trip creator cannot edit their own role.",
      });
    }

    const existingParticipant = await tripParticipantRepository.findOne({
      where: { trip: { trip_id }, user: { user_id: user.user_id } },
      relations: ["trip", "user"],
    });

    if (!existingParticipant) {
      return res.status(404).json({
        success: false,
        message: "User is not a participant in this trip.",
      });
    }

    existingParticipant.role = new_role;
    const updatedParticipant = await tripParticipantRepository.save(
      existingParticipant
    );

    res.status(200).json({
      success: true,
      message: "Participant role updated successfully.",
      participant: {
        trip: { trip_id: updatedParticipant.trip.trip_id },
        user: {
          user_id: updatedParticipant.user.user_id,
          email: updatedParticipant.user.email,
        },
        role: updatedParticipant.role,
      },
    });
  } catch (err) {
    console.error("Error editing participant role:", err);
    res.status(500).json({
      success: false,
      message: "Error editing participant role",
      error: err.message,
    });
  }
});

export default router;
