import { Activity } from "../models/activity.js";
import { Journey } from "../models/journey.js";
import dataSource from "../db/connection.js";

const activityRepository = dataSource.getRepository(Activity);
const journeyRepository = dataSource.getRepository(Journey);

export const createActivityService = async (
  journey_id,
  activity_name,
  location,
  cost,
  activity_type,
  description,
  user_id
) => {
  try {
    const journey = await journeyRepository.findOne({
      where: { journey_id },
      relations: [
        "trip",
        "trip.user",
        "trip.participants",
        "trip.participants.user",
      ],
    });

    if (!journey) {
      throw new Error("Journey not found");
    }

    if (journey.trip.user.user_id !== user_id) {
      const participant = journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        throw new Error(
          "You do not have permission to add an activity to this journey."
        );
      }
    }

    const newActivity = activityRepository.create({
      journey: { journey_id },
      activity_name,
      location,
      cost,
      activity_type,
      description,
    });

    if (cost) {
      //ensure expenses is initialized to 0 if it's null or undefined
      journey.expenses = (journey.expenses || 0) + cost;
      await journeyRepository.save(journey);
    }

    const savedActivity = await activityRepository.save(newActivity);
    return savedActivity;
  } catch (err) {
    throw new Error(err.message || "Error creating activity");
  }
};

export const deleteActivityService = async (activity_id, user_id) => {
  try {
    const activity = await activityRepository.findOne({
      where: { activity_id },
      relations: [
        "journey",
        "journey.trip",
        "journey.trip.user",
        "journey.trip.participants",
      ],
    });

    if (!activity) {
      throw new Error("Activity not found");
    }

    if (activity.journey.trip.user.user_id !== user_id) {
      const participant = activity.journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        throw new Error("You do not have permission to delete this activity.");
      }
    }

    await activityRepository.remove(activity);
    return true;
  } catch (err) {
    throw new Error(err.message || "Error deleting activity");
  }
};

export const updateActivityService = async (
  activity_id,
  activityData,
  user_id
) => {
  try {
    const activity = await activityRepository.findOne({
      where: { activity_id },
      relations: [
        "journey",
        "journey.trip",
        "journey.trip.user",
        "journey.trip.participants",
      ],
    });

    if (!activity) {
      throw new Error("Activity not found");
    }

    if (activity.journey.trip.user.user_id !== user_id) {
      const participant = activity.journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        throw new Error("You do not have permission to edit this activity.");
      }
    }

    Object.assign(activity, activityData);

    const updatedActivity = await activityRepository.save(activity);
    return updatedActivity;
  } catch (err) {
    throw new Error(err.message || "Error updating activity");
  }
};

export const getActivitiesByJourneyIdService = async (journey_id, user_id) => {
  try {
    const journey = await journeyRepository.findOne({
      where: { journey_id },
      relations: [
        "trip",
        "trip.user",
        "trip.participants",
        "trip.participants.user",
        "activities",
      ],
    });

    if (!journey) {
      throw new Error("Journey not found");
    }

    if (journey.trip.user.user_id !== user_id) {
      const participant = journey.trip.participants.find(
        (p) => p.user.user_id === user_id
      );
      
      if (
        !participant ||
        (participant.role !== "edit" && participant.role !== "view")
      ) {
        throw new Error(
          "You do not have permission to view activities for this journey."
        );
      }
    }

    return journey.activities;
  } catch (err) {
    throw new Error(err.message || "Error retrieving activities");
  }
};
