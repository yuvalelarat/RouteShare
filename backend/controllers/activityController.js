import { getUserIdFromToken } from "../utils/errorHelpers.js";
import {
  createActivityService,
  deleteActivityService,
  updateActivityService,
} from "../services/activityService.js";

export const createActivity = async (req, res) => {
  const { journey_id } = req.params;
  const { activity_name, location, cost, activity_type, description } =
    req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const newActivity = await createActivityService(
      journey_id,
      activity_name,
      location,
      cost,
      activity_type,
      description,
      user_id
    );

    res.status(201).json({
      success: true,
      activity: newActivity,
    });
  } catch (err) {
    console.error("Error creating activity:", err);
    res.status(500).json({
      success: false,
      message: "Error creating activity",
      error: err.message,
    });
  }
};

export const deleteActivity = async (req, res) => {
  const { activity_id } = req.params;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const success = await deleteActivityService(activity_id, user_id);

    if (success) {
      res.status(200).json({
        success: true,
        message: "Activity deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error deleting activity",
      });
    }
  } catch (err) {
    console.error("Error deleting activity:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting activity",
      error: err.message,
    });
  }
};

export const updateActivity = async (req, res) => {
  const { activity_id } = req.params;
  const { activity_name, location, cost, activity_type, description } =
    req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) return;

    const activityData = {
      activity_name,
      location,
      cost,
      activity_type,
      description,
    };

    const updatedActivity = await updateActivityService(
      activity_id,
      activityData,
      user_id
    );

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      activity: updatedActivity,
    });
  } catch (err) {
    console.error("Error updating activity:", err);
    res.status(500).json({
      success: false,
      message: "Error updating activity",
      error: err.message,
    });
  }
};
