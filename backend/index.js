import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataSource from "./db/connection.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import { authenticateToken } from "./middleware/authenticate.js";
import usersRouter from "./routes/usersRoute.js";
import tripsRouter from "./routes/tripsRoute.js";
import tripPaticipantsRouter from "./routes/tripParticipantsRoute.js";
import journeysRouter from "./routes/journeysRoute.js";
import activitiesRouter from "./routes/activitiesRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

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

//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/trips", authenticateToken, tripsRouter);
app.use("/participants", authenticateToken, tripPaticipantsRouter);
app.use("/journeys", authenticateToken, journeysRouter);
app.use("/activities", authenticateToken, activitiesRouter);

//errir middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
