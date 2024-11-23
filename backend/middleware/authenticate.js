import { verifyJwt } from "../utils/jwt.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJwt(token);

  if (!decoded) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }

  req.user = decoded;
  next();
}