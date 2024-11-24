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
    if (!currentUserId) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_id, email, role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return;
    }

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
    console.error("Unexpected error in addParticipant:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const removeParticipant = async (req, res) => {
  const { trip_id, email } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_id, email };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return;
    }

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
    console.error("Unexpected error in removeParticipant:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const editParticipantRole = async (req, res) => {
  const { trip_id, email, new_role } = req.body;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_id, email, new_role };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return;
    }

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
    console.error(
      "Unexpected error in editParticipantRole:",
      err.message || err
    );
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const getAllparticipants = async (req, res) => {
  const { trip_id } = req.params;

  try {
    const currentUserId = getUserIdFromToken(req, res);
    if (!currentUserId) {
      console.log("user id from token is not available");
      return;
    }

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
    console.error(
      "Unexpected error in getAllparticipants:",
      err.message || err
    );
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};
