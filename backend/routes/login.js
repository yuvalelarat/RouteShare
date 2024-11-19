import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import jwt from "jsonwebtoken";

const router = Router();
const userRepository = dataSource.getRepository(User);
const jwtSecret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
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

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      jwtSecret,
      { expiresIn: "5h" }
    );

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

export default router;
