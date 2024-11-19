import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";

const router = Router();
const userRepository = dataSource.getRepository(User);

router.get("/all", async (_, res) => {
  try {
    const users = await userRepository.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
});

export default router;
