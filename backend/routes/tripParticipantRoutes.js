import express from "express";
import  * as tripParticipantsController from "../controllers/tripParticipantsController.js";

const router = express.Router();

router.post("/add-participant", tripParticipantsController.addParticipant);
router.delete("/remove-participant", tripParticipantsController.removeParticipant);
router.patch("/edit-participant-role", tripParticipantsController.editParticipantRole);
router.get("/all-participants/:trip_id", tripParticipantsController.getAllparticipants);

export default router;
