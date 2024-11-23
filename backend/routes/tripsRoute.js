import { Router } from "express";
import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";

const router = Router();
const tripRepository = dataSource.getRepository(Trip);

router.post("/new-trip", async (req, res) => {
  const { trip_name, start_date, end_date, description } = req.body;

  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized: Missing user_id" });
    }
    console.log(`the user id is ${user_id}`);

    if (!trip_name || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (trip_name, start_date, end_date).",
      });
    }

    const user = await dataSource.getRepository(User).findOneBy({ user_id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingTrip = await tripRepository.findOneBy({ user: { user_id } });
    if (existingTrip) {
      return res.status(403).json({
        success: false,
        message: "User already has a trip. Cannot create another trip.",
      });
    }

    const newTrip = tripRepository.create({
      user: { user_id },
      trip_name,
      start_date,
      end_date,
      description,
    });

    const savedTrip = await tripRepository.save(newTrip);

    res.status(201).json({ success: true, trip: savedTrip });
  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({
      success: false,
      message: "Error creating trip",
      error: err.message,
    });
  }
});

export default router;
