import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/register", userController.registerUser);
router.get("/verify-email", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.get("/all", userController.getAllUsers);

export default router;
