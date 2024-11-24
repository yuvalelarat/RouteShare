import * as userService from "../services/userService.js";

export const registerUser = async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    const savedUser = await userService.createUser(email, password, full_name);
    res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await userService.validatePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = userService.generateAuthToken(user);

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
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};
