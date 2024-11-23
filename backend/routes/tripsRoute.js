import { Router } from "express";
import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import {
  checkIfEntitiesExist,
  checkIfEntityExists,
  checkRequiredFields,
  getUserIdFromToken,
} from "../helpers/errorHelpers.js";

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

    res.status(201).json({
      success: true,
      trip: {
        ...savedTrip, 
        user: {
          user_id: savedTrip.user.user_id,
          email: savedTrip.user.email,
        },
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
