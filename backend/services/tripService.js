import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import { TripParticipant } from "../models/tripParticipant.js";
import dataSource from "../db/connection.js";
import { checkIfEntitiesExist } from "../utils/errorHelpers.js";

const tripRepository = dataSource.getRepository(Trip);

export const createTripService = async (
  user_id,
  trip_name,
  start_date,
  end_date,
  description
) => {
  const user = await dataSource.getRepository(User).findOneBy({ user_id });

  const entitiesNotFound = await checkIfEntitiesExist([user], ["User"]);
  if (entitiesNotFound) return { error: "User not found" };

  const existingTrip = await tripRepository.findOneBy({ user: { user_id } });
  if (existingTrip) {
    return { error: "User already has a trip. Cannot create another trip." };
  }

  const newTrip = tripRepository.create({
    user,
    trip_name,
    start_date,
    end_date,
    description,
  });

  const savedTrip = await tripRepository.save(newTrip);

  const tripParticipantRepository = dataSource.getRepository(TripParticipant);
  const newParticipant = tripParticipantRepository.create({
    trip: savedTrip,
    user,
    role: "admin",
  });

  await tripParticipantRepository.save(newParticipant);

  return {
    trip: {
      ...savedTrip,
      user: {
        user_id: savedTrip.user.user_id,
        email: savedTrip.user.email,
      },
      participants: [
        {
          trip_participant_id: newParticipant.trip_participant_id,
          user_id: newParticipant.user.user_id,
          role: newParticipant.role,
        },
      ],
    },
  };
};

export const getTripService = async (trip_id, user_id) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user", "participants", "participants.user"],
  });

  if (!trip) {
    return { error: "Trip not found" };
  }

  if (trip.user.user_id !== user_id) {
    const participant = trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || !["view", "edit"].includes(participant.role)) {
      return {
        error:
          "You must be a participant with 'view' or 'edit' role to access this trip",
      };
    }
  }

  return {
    trip: {
      ...trip,
      user: {
        user_id: trip.user.user_id,
        email: trip.user.email,
      },
    },
  };
};

export const deleteTripService = async (user_id) => {
  const trip = await tripRepository.findOne({
    where: { user: { user_id } },
    relations: ["user"],
  });

  if (!trip) {
    return { error: "Trip not found" };
  }

  if (trip.user.user_id !== user_id) {
    return { error: "You can only delete your own trips" };
  }

  await tripRepository.delete(trip.trip_id);

  return { message: "Trip deleted successfully" };
};

export const editTripService = async (
  trip_id,
  user_id,
  trip_name,
  start_date,
  end_date,
  description
) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user", "participants", "participants.user"],
  });

  if (!trip) {
    return { error: "Trip not found" };
  }

  if (trip.user.user_id !== user_id) {
    const participant = trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || !["edit"].includes(participant.role)) {
      return {
        error:
          "You must be the trip owner or a participant with 'edit' role to edit this trip",
      };
    }
  }

  trip.trip_name = trip_name || trip.trip_name;
  trip.start_date = start_date || trip.start_date;
  trip.end_date = end_date || trip.end_date;
  trip.description = description || trip.description;

  const updatedTrip = await tripRepository.save(trip);

  return {
    trip: {
      ...updatedTrip,
      user: {
        user_id: updatedTrip.user.user_id,
        email: updatedTrip.user.email,
      },
    },
  };
};
