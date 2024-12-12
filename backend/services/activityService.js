import { Activity } from "../models/activity.js";
import { Journey } from "../models/journey.js";
import { TripParticipant } from "../models/tripParticipant.js";
import dataSource from "../db/connection.js";

const activityRepository = dataSource.getRepository(Activity);
const journeyRepository = dataSource.getRepository(Journey);
const tripParticipantRepository = dataSource.getRepository(TripParticipant);

export const createActivityService = async (
    journey_id,
    activity_name,
    location,
    cost,
    activity_type,
    description,
    user_id,
    normalizedPaidBy,
    payment_method
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

    if (cost < 0) {
        throw new Error("Cost cannot be negative");
    }

    if (!journey) {
      throw new Error("Journey not found");
    }

    if (payment_method === "Single payment" && normalizedPaidBy === null) {
      throw new Error("Single payment requires a user to be selected.");
    }

    if(payment_method === "No Payment" && cost > 0) {
        throw new Error("No Payment does require 0 cost.");
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

    if (normalizedPaidBy !== null) {
      const isPaidByValid = journey.trip.user.user_id === normalizedPaidBy ||
          journey.trip.participants.some((p) => p.user.user_id === normalizedPaidBy);
      if (!isPaidByValid) {
        throw new Error("The user who paid for the activity must be the trip creator or a participant.");
      }
    }

    if (cost && isNaN(parseFloat(cost))) {
      throw new Error("Invalid cost value");
    }
    const numericCost = parseFloat(cost);
    if (isNaN(numericCost)) {
      throw new Error("Invalid cost value");
    }

    // Create activity
    const activityData = {
      journey: { journey_id },
      activity_name,
      location,
      cost: numericCost,
      activity_type,
      description,
      paid_by: normalizedPaidBy !== null ? { user_id: normalizedPaidBy } : null,
      payment_method
    };

    const newActivity = activityRepository.create(activityData);
    const savedActivity = await activityRepository.save(newActivity);

    // Update journey expenses
    if (numericCost) {
      journey.expenses = parseFloat((parseFloat(journey.expenses) + numericCost).toFixed(2));
      await journeyRepository.save(journey);
    }

    // Handle participant expenses based on payment method
    if (payment_method === "Equal Payment") {
      // Add full cost to each participant
      const updatePromises = journey.trip.participants.map(async (participant) => {
        participant.expenses = parseFloat( parseFloat(participant.expenses) + numericCost).toFixed(2);
        return tripParticipantRepository.save(participant);
      });
      await Promise.all(updatePromises);
    } else if (payment_method === "Equal Division") {
      // Divide cost equally among participants
      const participantCount = journey.trip.participants.length;
      const costPerParticipant = parseFloat((numericCost / participantCount).toFixed(2));
      console.log(costPerParticipant);

      const updatePromises = journey.trip.participants.map(async (participant) => {
        participant.expenses = parseFloat(parseFloat(participant.expenses) + costPerParticipant).toFixed(2);
        return tripParticipantRepository.save(participant);
      });
      await Promise.all(updatePromises);
    } else if (payment_method === "Single payment") {
      // Add cost only to the user who paid
      const participantToPay = journey.trip.participants.find(
          (participant) => participant.user.user_id === normalizedPaidBy
      );

      if (participantToPay) {
        participantToPay.expenses = parseFloat(participantToPay.expenses) + numericCost;
        await tripParticipantRepository.save(participantToPay);
      }
    }
    // For "No Payment", do nothing to expenses

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

    if (activity.cost) {
      activity.journey.expenses = (activity.journey.expenses || 0) - activity.cost;
      await journeyRepository.save(activity.journey);
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
        "activities.paid_by",
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

    return {
      activities: journey.activities,
      start_date: journey.trip.start_date,
      day_number: journey.day_number,
      country: journey.country,
    };
  } catch (err) {
    throw new Error(err.message || "Error retrieving activities");
  }
};
