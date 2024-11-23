import {
  createJourneyService,
  deleteJourneyService,
  editJourneyService,
  getAllJourneysService,
} from "../services/journeyService.js";
import { getUserIdFromToken } from "../utils/errorHelpers.js";

export const createJourney = async (req, res) => {
  const { trip_id, day_number, country, description } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const savedJourney = await createJourneyService(
      { trip_id, day_number, country, description },
      user_id
    );
    res.status(201).json({
      success: true,
      journey: savedJourney,
    });
  } catch (err) {
    console.error("Error creating journey:", err);
    res.status(500).json({
      success: false,
      message: "Error creating journey",
      error: err.message,
    });
  }
};

export const deleteJourney = async (req, res) => {
  const { journey_id } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const message = await deleteJourneyService(journey_id, user_id);
    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    console.error("Error deleting journey:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting journey",
      error: err.message,
    });
  }
};

export const editJourney = async (req, res) => {
  const { journey_id, day_number, country, description } = req.body;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

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
    console.error("Error editing journey:", err);
    res.status(500).json({
      success: false,
      message: "Error editing journey",
      error: err.message,
    });
  }
};

export const getAllJourneys = async (req, res) => {
  const { trip_id } = req.params;
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const journeys = await getAllJourneysService(trip_id, user_id);
    res.status(200).json({
      success: true,
      journeys,
    });
  } catch (err) {
    console.error("Error fetching journeys:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching journeys",
      error: err.message,
    });
  }
};
