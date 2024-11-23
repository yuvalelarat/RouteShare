import {
  addParticipantService,
  removeParticipantService,
  editParticipantRoleService,
  getAllParticipantsService,
} from "../services/tripParticipantsService.js";
import {
  checkRequiredFields,
  getUserIdFromToken,
} from "../utils/errorHelpers.js";

export const addParticipant = async (req, res) => {
  const { trip_id, email, role } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email, role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const result = await addParticipantService(
      trip_id,
      email,
      role,
      currentUserId
    );

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(201).json({
      success: true,
      message: "User added as participant",
      participant: result,
    });
  } catch (err) {
    console.error("Error in addParticipant:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const removeParticipant = async (req, res) => {
  const { trip_id, email } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const result = await removeParticipantService(
      trip_id,
      email,
      currentUserId
    );

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: "User removed as participant.",
    });
  } catch (err) {
    console.error("Error in removeParticipant:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const editParticipantRole = async (req, res) => {
  const { trip_id, email, new_role } = req.body;
  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const requiredFields = { trip_id, email, new_role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) return;

    const result = await editParticipantRoleService(
      trip_id,
      email,
      new_role,
      currentUserId
    );

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: "Participant role updated successfully.",
      participant: result,
    });
  } catch (err) {
    console.error("Error in editParticipantRole:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const getAllparticipants = async (req, res) => {
  const { trip_id } = req.params;
  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) return;

    const result = await getAllParticipantsService(trip_id, currentUserId);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      participants: result.participants,
    });
  } catch (err) {
    console.error("Error in getAllParticipants:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
