import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";

const router = Router();
const userRepository = dataSource.getRepository(User);

router.post("/", async (req, res) => {
  const { email, password, full_name } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      email,
      password_hash: passwordHash,
      full_name,
    });
    const savedUser = await userRepository.save(newUser);

    res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
});

export default router;
