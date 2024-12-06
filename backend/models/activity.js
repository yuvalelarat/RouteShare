import { EntitySchema } from "typeorm";
import { Journey } from "./journey.js";

export const Activity = new EntitySchema({
  name: "Activity",
  tableName: "activities",
  columns: {
    activity_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    activity_name: {
      type: "varchar",
      length: 255,
      nullable: false, 
    },
    location: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    cost: {
      type: "numeric",
      precision: 10,
      scale: 2,
      nullable: true,
    },
    activity_type: {
      type: "enum",
      length: 50,
      enum: ["Sightseeing", "Adventure", "Culture", "Relaxation", "Culinary", "Entertainment"],
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
  },
  relations: {
    journey: {
      target: "Journey",
      type: "many-to-one",
      joinColumn: {
        name: "journey_id",
      },
      onDelete: "CASCADE",
    },
  },
});
