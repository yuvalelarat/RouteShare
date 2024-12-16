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

    if (numericCost && payment_method !== "Equal Payment") {
      journey.expenses = parseFloat((parseFloat(journey.expenses) + numericCost).toFixed(2));
      await journeyRepository.save(journey);
    }

    if (payment_method === "Equal Payment") {
      const participantCount = journey.trip.participants.length;
      const totalCost = parseFloat(numericCost * participantCount);

      const updatePromises = journey.trip.participants.map(async (participant) => {
        participant.expenses = parseFloat(
            (parseFloat(participant.expenses) + numericCost).toFixed(2)
        );
        return tripParticipantRepository.save(participant);
      });
      await Promise.all(updatePromises);

      journey.expenses = parseFloat(
          (parseFloat(journey.expenses) + totalCost).toFixed(2)
      );
      await journeyRepository.save(journey);
    } else if (payment_method === "Single payment") {
      const participantToPay = journey.trip.participants.find(
          (participant) => participant.user.user_id === normalizedPaidBy
      );

      if (participantToPay) {
        participantToPay.expenses = parseFloat(participantToPay.expenses) + numericCost;
        await tripParticipantRepository.save(participantToPay);
      }
    }

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
        "journey.trip.participants.user",
        "paid_by"
      ],
    });

    if (!activity) {
      throw new Error("Activity not found");
    }

    if (activity.journey.trip.user?.user_id !== user_id) {
      const participant = activity.journey.trip.participants.find(
          (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        throw new Error("You do not have permission to delete this activity.");
      }
    }

    if (activity.payment_method === "No Payment" && activity.cost > 0) {
      throw new Error("No Payment activities must have a cost of 0.");
    }

    const numericCost = parseFloat(activity.cost);
    if (isNaN(numericCost)) {
      throw new Error("Invalid cost value");
    }

    if (activity.payment_method === "Equal Payment") {
      const participantCount = activity.journey.trip.participants.length;
      const totalCost = numericCost * (participantCount - 1);

      await Promise.all(
          activity.journey.trip.participants.map(async (participant) => {
            participant.expenses = parseFloat(
                (parseFloat(participant.expenses) - numericCost).toFixed(2)
            );
            await tripParticipantRepository.save(participant);
          })
      );

      activity.journey.expenses = parseFloat(
          (parseFloat(activity.journey.expenses) - totalCost).toFixed(2)
      );
      await journeyRepository.save(activity.journey);
    } else if (activity.payment_method === "Single payment") {
      const participantToPay = activity.journey.trip.participants.find(
          (participant) => participant.user?.user_id === activity.paid_by?.user_id
      );



      if (participantToPay) {
        participantToPay.expenses = parseFloat(
            (parseFloat(participantToPay.expenses) - numericCost).toFixed(2)
        );
        await tripParticipantRepository.save(participantToPay);
      }
    }

    if (activity.cost) {
      activity.journey.expenses = parseFloat(
          (parseFloat(activity.journey.expenses) - numericCost).toFixed(2)
      );
      await journeyRepository.save(activity.journey);
    }

    await activityRepository.remove(activity);

    return true;
  } catch (err) {
    throw new Error(err.message || "Error deleting activity");
  }
};

/*export const updateActivityService = async (
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
        "paid_by"
      ],
    });

    if (!activity) {
      throw new Error("Activity not found");
    }

    if (activity.journey.trip.user?.user_id !== user_id) {
      const participant = activity.journey.trip.participants.find(
          (p) => p.user.user_id === user_id
      );
      if (!participant || participant.role !== "edit") {
        throw new Error("You do not have permission to edit this activity.");
      }
    }

    if (parseFloat(activityData.cost) < 0) {
      throw new Error("Cost cannot be negative");
    }

    if (activityData.payment_method === "Single payment" && !activityData.normalizedPaidBy) {
      throw new Error("Single payment requires a user to be selected.");
    }

    if (activityData.payment_method === "No Payment" && parseFloat(activityData.cost) > 0) {
      throw new Error("No Payment method requires 0 cost.");
    }

    if (activityData.normalizedPaidBy !== null) {
      const isPaidByValid = activity.journey.trip.user.user_id === activityData.normalizedPaidBy ||
          activity.journey.trip.participants.some((p) => p.user.user_id === activityData.normalizedPaidBy);
      if (!isPaidByValid) {
        throw new Error("The user who paid for the activity must be the trip creator or a participant.");
      }
    }s

    const numericCost = parseFloat(activityData.cost);
    if (isNaN(numericCost)) {
      throw new Error("Invalid cost value");
    }

    const oldCost = activity.cost || 0;
    const newCost = numericCost;
    const costDifference = newCost - oldCost;

    // Handle expense updates based on payment method
    if (activity.payment_method === "Equal Payment") {
      const participantCount = activity.journey.trip.participants.length;
      const perParticipantCost = costDifference;

      // Update each participant's expenses
      const updatePromises = activity.journey.trip.participants.map(async (participant) => {
        participant.expenses = parseFloat(
            (parseFloat(participant.expenses) + perParticipantCost).toFixed(2)
        );
        return tripParticipantRepository.save(participant);
      });
      await Promise.all(updatePromises);

      // Update journey expenses
      activity.journey.expenses = parseFloat(
          (parseFloat(activity.journey.expenses) + (perParticipantCost * participantCount)).toFixed(2)
      );
      await journeyRepository.save(activity.journey);

    } else if (activity.payment_method === "Single payment") {
      // Find the participant who paid
      const participantToPay = activity.journey.trip.participants.find(
          (participant) => participant.user?.user_id === activityData.normalizedPaidBy
      );

      if (participantToPay) {
        participantToPay.expenses = parseFloat(
            (parseFloat(participantToPay.expenses) + costDifference).toFixed(2)
        );
        await tripParticipantRepository.save(participantToPay);
      }

      activity.journey.expenses = parseFloat(
          (parseFloat(activity.journey.expenses) + costDifference).toFixed(2)
      );
      await journeyRepository.save(activity.journey);
    }

    // Update activity fields
    activity.activity_name = activityData.activity_name;
    activity.location = activityData.location;
    activity.cost = newCost;
    activity.activity_type = activityData.activity_type;
    activity.description = activityData.description;
    activity.paid_by = activityData.normalizedPaidBy
        ? { user_id: activityData.normalizedPaidBy }
        : null;
    activity.payment_method = activityData.payment_method;

    const updatedActivity = await activityRepository.save(activity);
    return updatedActivity;
  } catch (err) {
    throw new Error(err.message || "Error updating activity");
  }
};*/

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
      var participant = journey.trip.participants.find(
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
      role: participant ? participant.role : "admin",
    };
  } catch (err) {
    throw new Error(err.message || "Error retrieving activities");
  }
};
