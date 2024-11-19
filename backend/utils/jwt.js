import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId, email) => {
  return jwt.sign({ user_id: userId, email: email }, jwtSecret, {
    expiresIn: "2h",
  });
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};
