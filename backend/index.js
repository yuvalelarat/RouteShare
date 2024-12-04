import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import dataSource from "./db/connection.js";
import { authenticateToken } from "./middleware/authenticate.js";
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import tripPaticipantRoutes from "./routes/tripParticipantRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cors()); //allow from all origins (for now)

//connect to postgresql db
(async () => {
  try {
    await dataSource.initialize();
    console.log("Data source initialized");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
})();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

//routes
app.use("/users", userRoutes);
app.use("/trips", authenticateToken, tripRoutes);
app.use("/participants", authenticateToken, tripPaticipantRoutes);
app.use("/journeys", authenticateToken, journeyRoutes);
app.use("/activities", authenticateToken, activityRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('join-trip', (tripId) => {
    socket.join(tripId);
    console.log(`User joined trip: ${tripId}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export const emitNewJourney = (tripId, newJourney) => {
  io.to(tripId).emit('new-journey', newJourney);
};

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});