import {
  getUserIdFromToken,
  checkRequiredFields,
} from "../utils/errorHelpers.js";
import {
  createActivityService,
  deleteActivityService,
  updateActivityService,
  getActivitiesByJourneyIdService
} from "../services/activityService.js";
import { emitDeleteActivity, emitNewActivity } from '../socket/socket.js';
import dataSource from '../db/connection.js';
import { User } from '../models/user.js';

const userRepository = dataSource.getRepository(User);

export const createActivity = async (req, res) => {
  const { journey_id } = req.params;
  const { activity_name, location, cost, activity_type, description, paid_by, payment_method } =
    req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { activity_name, location, activity_type, payment_method };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    let normalizedPaidBy = paid_by;
    if (
        payment_method === 'Equal payment' ||
        payment_method === 'Equal division' ||
        payment_method === 'No payment'
    ) {
      normalizedPaidBy = null;
    }

    const newActivity = await createActivityService(
        journey_id,
        activity_name,
        location,
        cost,
        activity_type,
        description,
        user_id,
        normalizedPaidBy,
        payment_method
    );

    if (normalizedPaidBy !== null) {
      const paidByUser = await userRepository.findOne({ where: { user_id: paid_by } });
      newActivity.paid_by = paidByUser;
    }else {
        newActivity.paid_by = null;
    }

    emitNewActivity(journey_id, newActivity);

    res.status(201).json({
      success: true,
      activity: newActivity,
    });
  } catch (err) {
    console.error("Unexpected error in createActivity:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const deleteActivity = async (req, res) => {
  const { activity_id } = req.params;
  const { journey_id } = req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    console.log("User ID:", user_id);

    const success = await deleteActivityService(activity_id, user_id);

    emitDeleteActivity(journey_id, activity_id);

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
    console.error("Unexpected error in deleteActivity:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const updateActivity = async (req, res) => {
  const { activity_id } = req.params;
  const { activity_name, location, cost, activity_type, description } =
    req.body;

  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { activity_name, location };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

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
    console.error("Unexpected error in updateActivity:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const getActivitiesByJourneyId = async (req, res) => {
  const { journey_id } = req.params;

  try {
    const user_id = getUserIdFromToken(req, res);
   if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const result = await getActivitiesByJourneyIdService(journey_id, user_id);

    if (result.error) {
      return res.status(403).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      response: result,
    });
  } catch (err) {
    console.error("Unexpected error in getActivityByJourneyId:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}