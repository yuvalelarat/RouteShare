import { EntitySchema } from "typeorm";
import { Trip } from "./trip.js";
import { Activity } from "./activity.js";

export const Journey = new EntitySchema({
  name: "Journey",
  tableName: "journeys",
  columns: {
    journey_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    day_number: {
      type: "integer",
      nullable: false,
    },
    country: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true, 
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
    expenses: {
      type: "numeric",
      default: 0,
    }
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
    activities: {
      target: "Activity",
      type: "one-to-many",
      inverseSide: "journey",
    },
  },
});
