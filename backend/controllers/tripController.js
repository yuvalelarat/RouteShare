import {
  createTripService,
  deleteTripService,
  getTripService,
  editTripService,
} from "../services/tripService.js";
import {
  checkRequiredFields,
  getUserIdFromToken,
} from "../utils/errorHelpers.js";

export const createTrip = async (req, res) => {
  const { trip_name, start_date, end_date, description } = req.body;
  const user_id = getUserIdFromToken(req, res);
  if (!user_id) return;

  const validationError = checkRequiredFields(
    { trip_name, start_date, end_date },
    res
  );
  if (validationError) return validationError;

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
};

export const getTrip = async (req, res) => {
  const { trip_id } = req.params;
  const user_id = getUserIdFromToken(req, res);
  if (!user_id) return;

  const result = await getTripService(trip_id, user_id);

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
};

export const deleteTrip = async (req, res) => {
  const user_id = getUserIdFromToken(req, res);
  if (!user_id) return;

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
};

export const editTrip = async (req, res) => {
  const { trip_id } = req.params;
  const { trip_name, start_date, end_date, description } = req.body;
  const user_id = getUserIdFromToken(req, res);
  if (!user_id) return;

  const validationError = checkRequiredFields(
    { trip_name, start_date, end_date },
    res
  );
  if (validationError) return validationError;

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
};
