import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import dataSource from "../db/connection.js";

const userRepository = dataSource.getRepository(User);

export const createUser = async (email, password, full_name) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = userRepository.create({
    email,
    password_hash: passwordHash,
    full_name,
  });

  return await userRepository.save(newUser);
};

export const findUserByEmail = async (email) => {
  return await userRepository.findOneBy({ email });
};

export const validatePassword = async (inputPassword, storedPasswordHash) => {
  return await bcrypt.compare(inputPassword, storedPasswordHash);
};

export const generateAuthToken = (user) => {
  return generateToken(user.user_id, user.email);
};

export const getAllUsers = async () => {
  return await userRepository.find();
};
