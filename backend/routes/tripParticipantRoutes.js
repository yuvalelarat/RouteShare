import express from "express";
import {
  addParticipant,
  removeParticipant,
  editParticipantRole,
  getAllparticipants,
} from "../controllers/tripParticipantsController.js";

const router = express.Router();

router.post("/add-participant", addParticipant);
router.delete("/remove-participant", removeParticipant);
router.patch("/edit-participant-role", editParticipantRole);
router.get("/all-participants/:trip_id", getAllparticipants);

export default router;
