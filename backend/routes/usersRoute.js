import { Router } from "express";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const router = Router();
const userRepository = dataSource.getRepository(User);

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.user_id, user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: err.message,
    });
  }
});

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
