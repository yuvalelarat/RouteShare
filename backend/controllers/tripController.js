import {
  createTripService,
  deleteTripService,
  getTripService,
  editTripService,
  getAllTripsService,
  getTripWithAllDetailsService
} from "../services/tripService.js";
import {
  checkRequiredFields,
  getUserIdFromToken,
} from "../utils/errorHelpers.js";

export const createTrip = async (req, res, next) => {
  try {
    const { trip_name, start_date, end_date, description } = req.body;
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_name, start_date, end_date };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    const result = await createTripService(
      user_id,
      trip_name,
      start_date,
      end_date,
      description
    );

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(201).json({
      success: true,
      trip: result.trip,
    });
  } catch (err) {
    console.error("Unexpected error in createTrip:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const getTrip = async (req, res, next) => {
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const result = await getTripService(user_id);

    if (result.error) {
      return res.status(403).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      trip: result.trip,
    });
  } catch (err) {
    console.error("Unexpected error in getTrip:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const result = await deleteTripService(user_id);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    console.error("Unexpected error in deleteTrip:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const editTrip = async (req, res, next) => {
  try {
    const { trip_id } = req.params;
    const { trip_name, start_date, end_date, description } = req.body;

    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const requiredFields = { trip_name, start_date, end_date };
    const fieldsNotFound = checkRequiredFields(requiredFields, res);
    if (fieldsNotFound) {
      console.log("missing required fields");
      return fieldsNotFound;
    }

    const result = await editTripService(
      trip_id,
      user_id,
      trip_name,
      start_date,
      end_date,
      description
    );

    if (result.error) {
      return res.status(403).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      trip: result.trip,
    });
  } catch (err) {
    console.error("Unexpected error in editTrip:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

export const getAllTrips = async (req, res, next) => {
  try {
    const user_id = getUserIdFromToken(req, res);
    if (!user_id) {
      console.log("user id from token is not available");
      return;
    }

    const result = await getAllTripsService(user_id);

    if (result.error) {
      return res.status(403).json({
        success: false,
        message: result.error,
      });
    }

    res.status(200).json({
      success: true,
      trips: result,
    });
  } catch (err) {
    console.error("Unexpected error in getAllTrips:", err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};