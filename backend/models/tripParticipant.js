import { EntitySchema } from "typeorm";
import { Trip } from "./trip.js";
import { User } from "./user.js";

export const TripParticipant = new EntitySchema({
  name: "TripParticipant",
  tableName: "trip_participants",
  columns: {
    trip_participant_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    role: {
      type: "varchar",
      length: 10,
    },
    expenses: {
      type: "numeric",
      default: 0,
    },
    joined_at: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    trip: {
      target: "Trip",
      type: "many-to-one",
      joinColumn: {
        name: "trip_id",
      },
      onDelete: "CASCADE",
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
});
