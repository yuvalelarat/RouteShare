import { TripParticipant } from "../models/tripParticipant.js";
import { Trip } from "../models/trip.js";
import { User } from "../models/user.js";
import dataSource from "../db/connection.js";
import { checkIfEntitiesExist } from "../utils/errorHelpers.js";

const tripParticipantRepository = dataSource.getRepository(TripParticipant);

export const addParticipantService = async (
  trip_id,
  email,
  role,
  currentUserId
) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user"],
  });

  const user = await dataSource.getRepository(User).findOneBy({ email });

  const entitiesNotFound = await checkIfEntitiesExist(
    [trip, user],
    ["Trip", "User"]
  );
  if (entitiesNotFound) return { error: "Entities not found" };

  if (trip.user.user_id !== currentUserId) {
    throw new Error("Unauthorized");
  }

  const existingParticipant = await tripParticipantRepository.findOne({
    where: { trip: { trip_id }, user: { user_id: user.user_id } },
  });

  if (existingParticipant) {
    throw new Error("User is already a participant");
  }

  const newTripParticipant = tripParticipantRepository.create({
    trip,
    user,
    role,
    expenses: 0,
  });

  const savedParticipant = await tripParticipantRepository.save(
    newTripParticipant
  );

  return {
    trip_id: savedParticipant.trip.trip_id,
    user_id: savedParticipant.user.user_id,
    email: savedParticipant.user.email,
    role: savedParticipant.role,
    expenses: savedParticipant.expenses,
  };
};

export const removeParticipantService = async (
  trip_id,
  email,
  currentUserId
) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user"],
  });

  const user = await dataSource.getRepository(User).findOneBy({ email });

  const entitiesNotFound = await checkIfEntitiesExist(
    [trip, user],
    ["Trip", "User"]
  );
  if (entitiesNotFound) return { error: "Entities not found" };

  if (trip.user.user_id !== currentUserId) {
    throw new Error("Unauthorized");
  }

  if (trip.user.user_id === user.user_id) {
    throw new Error("The trip creator cannot remove themselves");
  }

  const existingParticipant = await tripParticipantRepository.findOne({
    where: { trip: { trip_id }, user: { user_id: user.user_id } },
  });

  if (!existingParticipant) {
    throw new Error("User is not a participant");
  }

  await tripParticipantRepository.delete({
    trip: { trip_id },
    user: { user_id: user.user_id },
  });

  return { success: true };
};

export const editParticipantRoleService = async (
  trip_id,
  email,
  new_role,
  currentUserId
) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user"],
  });

  const user = await dataSource.getRepository(User).findOneBy({ email });

  const entitiesNotFound = await checkIfEntitiesExist(
    [trip, user],
    ["Trip", "User"]
  );
  if (entitiesNotFound) {
    throw new Error("Entities not found");
  }

  if (trip.user.user_id !== currentUserId) {
    throw new Error("Unauthorized");
  }

  if (trip.user.user_id === user.user_id) {
    throw new Error("The trip creator cannot edit their own role");
  }

  const existingParticipant = await tripParticipantRepository.findOne({
    where: { trip: { trip_id }, user: { user_id: user.user_id } },
    relations: ["trip", "user"],
  });

  if (!existingParticipant) {
    throw new Error("User is not a participant");
  }

  existingParticipant.role = new_role;
  const updatedParticipant = await tripParticipantRepository.save(
    existingParticipant
  );

  return {
    trip_id: updatedParticipant.trip.trip_id,
    user_id: updatedParticipant.user.user_id,
    email: updatedParticipant.user.email,
    role: updatedParticipant.role,
  };
};

export const getAllParticipantsService = async (trip_id, currentUserId) => {
  const trip = await dataSource.getRepository(Trip).findOne({
    where: { trip_id },
    relations: ["user", "participants", "participants.user"],
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.user.user_id !== currentUserId) {
    const isParticipant = trip.participants.some(
      (p) => p.user.user_id === currentUserId
    );
    if (!isParticipant) {
      throw new Error("Unauthorized");
    }
  }

  const participants = trip.participants.map((participant) => ({
    user_id: participant.user.user_id,
    email: participant.user.email,
    role: participant.role,
    expenses: participant.expenses,
  }));

  return { participants };
};
