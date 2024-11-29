import { textFieldColors, DateFieldColors } from "./styles.js";

export const today = new Date().toISOString().split("T")[0];

export const fieldsConfig = [
  {
    id: "trip-name",
    label: "Trip name",
    type: "text",
    valueKey: "tripName",
    maxLength: 44,
    sx: { ...textFieldColors, width: "55%" },
  },
  {
    id: "start-date",
    label: "Start date",
    type: "date",
    valueKey: "startDate",
    refKey: "startDateInputRef",
    sx: DateFieldColors,
  },
  {
    id: "end-date",
    label: "End date",
    type: "date",
    valueKey: "endDate",
    refKey: "endDateInputRef",
    sx: DateFieldColors,
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    multiline: true,
    rows: 5,
    valueKey: "description",
    maxLength: 410,
    sx: textFieldColors,
  },
];
