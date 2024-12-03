import {
  createJourneyService,
  deleteJourneyService,
  editJourneyService,
  getAllJourneysService,
} from "../services/journeyService.js";
import {
  checkRequiredFields,
  getUserIdFromToken,
} from "../utils/errorHelpers.js";

export const createJourney = async (req, res) => {
  const { trip_id, day_number, country, description } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_id, day_number, country };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    const savedJourney = await createJourneyService(
      { trip_id, day_number, country, description },
      user_id
    );

    res.status(201).json({
      success: true,
      journey: savedJourney,
    });
  } catch (err) {
    console.error("Unexpected error in createJourney:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const deleteJourney = async (req, res) => {
  const { journey_id } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { journey_id };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    const message = await deleteJourneyService(journey_id, user_id);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    console.error("Unexpected error in deleteJourney:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const editJourney = async (req, res) => {
  const { journey_id, day_number, country, description } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { journey_id, day_number, country };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    const updatedJourney = await editJourneyService(
      { journey_id, day_number, country, description },
      user_id
    );

    res.status(200).json({
      success: true,
      message: "Journey updated successfully",
      journey: updatedJourney,
    });
  } catch (err) {
    console.error("Unexpected error in editJourney:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const getAllJourneys = async (req, res) => {
  const { trip_id } = req.params;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("User ID from token is not available");
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    const tripDetails = await getAllJourneysService(trip_id, user_id);

    res.status(200).json({
      success: true,
      ...tripDetails,
    });
  } catch (err) {
    console.error("Unexpected error in getAllJourneys:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};
