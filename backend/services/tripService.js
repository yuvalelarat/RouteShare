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
    throw new Error("User already has a trip. Cannot create another trip.");
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

export const getTripService = async (user_id) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { user: { user_id } },
    relations: ["user", "participants", "participants.user"],
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.user.user_id !== user_id) {
    const participant = trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || !["view", "edit"].includes(participant.role)) {
      throw new Error(
        "You must be a participant with 'view' or 'edit' role to access this trip"
      );
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
    throw new Error("Trip not found");
  }

  if (trip.user.user_id !== user_id) {
    throw new Error("You can only delete your own trips");
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
    throw new Error("Trip not found");
  }

  if (trip.user.user_id !== user_id) {
    const participant = trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || !["edit"].includes(participant.role)) {
      throw new Error(
        "You must be the trip owner or a participant with 'edit' role to edit this trip"
      );
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

export const getAllTripsService = async (user_id) => {
  try {
    const tripRepository = dataSource.getRepository(Trip);

    const participantTrips = await tripRepository
      .createQueryBuilder("trip")
      .innerJoinAndSelect("trip.participants", "participant") //include participant
      .innerJoinAndSelect("participant.user", "user")
      .where("participant.role IN (:...roles)", { roles: ["view", "edit"] })
      .andWhere("user.user_id = :user_id", { user_id })
      .getMany();

    return { trips: participantTrips };
  } catch (err) {
    console.error("Error fetching trips:", err);
    throw new Error("Error fetching trips");
  }
};

export const getTripWithAllDetailsService = async (trip_id, user_id) => {
  try {
    const tripRepository = dataSource.getRepository(Trip);

    const trip = await tripRepository
      .createQueryBuilder("trip")
      .leftJoinAndSelect("trip.journeys", "journey") //include journeys
      .leftJoinAndSelect("journey.activities", "activity") //include activities
      .innerJoinAndSelect("trip.participants", "participant") //include participants
      .innerJoinAndSelect("participant.user", "user") //include user details for participants
      .where("trip.trip_id = :trip_id", { trip_id }) //filter by trip_id
      .getOne();

    if (!trip) {
      throw new Error("Trip not found");
    }

    const isOwner = trip.user.user_id === user_id;
    const isParticipant = trip.participants.some(
      (participant) =>
        participant.user.user_id === user_id &&
        ["view", "edit"].includes(participant.role)
    );

    if (!isOwner && !isParticipant) {
      throw new Error(
        "Unauthorized: You do not have permission to view this trip"
      );
    }

    return {
      trip: {
        trip_id: trip.trip_id,
        name: trip.name,
        description: trip.description,
        journeys: trip.journeys,
      },
    };
  } catch (err) {
    console.error("Error fetching trip with journeys and activities:", err);
    throw new Error("Error fetching trip with journeys and activities");
  }
};
