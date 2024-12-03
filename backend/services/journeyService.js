import { Journey } from "../models/journey.js";
import { Trip } from "../models/trip.js";
import dataSource from "../db/connection.js";
import { checkIfEntitiesExist } from "../utils/errorHelpers.js";

const journeyRepository = dataSource.getRepository(Journey);
const tripRepository = dataSource.getRepository(Trip);

export const createJourneyService = async (
  { trip_id, day_number, country, description },
  user_id
) => {
  const trip = await tripRepository.findOne({
    where: { trip_id },
    relations: ["user", "participants", "participants.user"],
  });

  if (!trip) {
    throw new Error("Trip not found" );
  }

  if (trip.user && trip.user.user_id !== user_id) {
    const participant = trip.participants.find(
      (p) => p.user && p.user.user_id === user_id
    );
    if (!participant || participant.role !== "edit") {
      throw new Error(
        "You do not have permission to add a journey to this trip"
      );
    }
  }

  const existingJourney = await journeyRepository.findOne({
    where: { trip: { trip_id }, day_number },
  });

  if (existingJourney) {
    throw new Error(
      `A journey already exists for day ${day_number} in this trip.`
    );
  }

  const newJourney = journeyRepository.create({
    trip: { trip_id, user_id },
    day_number,
    country,
    description,
  });

  const savedJourney = await journeyRepository.save(newJourney);
  return savedJourney;
};

export const deleteJourneyService = async (journey_id, user_id) => {
  const journey = await journeyRepository.findOne({
    where: { journey_id },
    relations: ["trip", "trip.user", "trip.participants"],
  });

  const entitiesNotFound = await checkIfEntitiesExist([journey], ["Journey"]);
  if (entitiesNotFound) throw new Error("Journey not found");

  if (journey.trip.user.user_id !== user_id) {
    const participant = journey.trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || participant.role !== "edit") {
      throw new Error("You do not have permission to delete this journey");
    }
  }

  await journeyRepository.delete(journey_id);
  return "Journey deleted successfully";
};

export const editJourneyService = async (
  { journey_id, day_number, country, description },
  user_id
) => {
  const journey = await journeyRepository.findOne({
    where: { journey_id },
    relations: ["trip", "trip.user", "trip.participants"],
  });

  const entitiesNotFound = await checkIfEntitiesExist([journey], ["Journey"]);
  if (entitiesNotFound) throw new Error("Journey not found");

  if (journey.trip.user.user_id !== user_id) {
    const participant = journey.trip.participants.find(
      (p) => p.user.user_id === user_id
    );
    if (!participant || participant.role !== "edit") {
      throw new Error("You do not have permission to edit this journey");
    }
  }

  if (day_number && day_number !== journey.day_number) {
    const conflictingJourney = await journeyRepository.findOne({
      where: { trip: { trip_id: journey.trip.trip_id }, day_number },
    });

    if (conflictingJourney) {
      throw new Error(
        `A journey already exists for day ${day_number} in this trip.`
      );
    }
  }

  if (day_number !== undefined) journey.day_number = day_number;
  if (country !== undefined) journey.country = country;
  if (description !== undefined) journey.description = description;

  const updatedJourney = await journeyRepository.save(journey);
  return updatedJourney;
};

export const getAllJourneysService = async (trip_id, user_id) => {
  const trip = await tripRepository.findOne({
    where: { trip_id },
    relations: ["user", "participants", "participants.user", "journeys"],
  });

  const entitiesNotFound = await checkIfEntitiesExist([trip], ["Trip"]);
  if (entitiesNotFound) throw new Error("Trip not found");

  if (trip.user.user_id !== user_id) {
    const isParticipant = trip.participants.some(
        (p) => p.user.user_id === user_id
    );
    if (!isParticipant) {
      throw new Error(
          "You do not have permission to view journeys for this trip."
      );
    }
  }

  const tripAdmin = trip.participants.find((participant) => participant.role === "admin");
  if (!tripAdmin) {
    throw new Error("Trip admin not found.");
  }

  const journeys = trip.journeys.map((journey) => ({
    journey_id: journey.journey_id,
    day_number: journey.day_number,
    country: journey.country,
    description: journey.description,
  }));


  return {
    trip_name: trip.trip_name,
    start_date: trip.start_date,
    end_date: trip.end_date,
    trip_admin: {
      admin_id: tripAdmin.user.user_id,
      admin_name: `${tripAdmin.user.first_name} ${tripAdmin.user.last_name}`,
    },
    journeys,
  };
};

