import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import PageTitle from "../../components/common/PageTitle";
import { textFieldColors, DateFieldColors } from "./constants";

const title = "Create a new trip";
const today = new Date().toISOString().split("T")[0];

function NewTrip() {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (startDateInputRef.current) {
      startDateInputRef.current.setAttribute("min", today); // Setting today's date as the min for start date
    }
  }, []);

  useEffect(() => {
    if (endDateInputRef.current && startDate) {
      endDateInputRef.current.setAttribute("min", startDate); // Ensuring end date is after start date
    }
  }, [startDate]);

  return (
    <>
      <PageTitle title={title} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            width: "50rem",
            boxShadow: "-4px 4px 4px rgba(0, 0, 0, 0.2)",
            marginTop: 3,
            border: "1px solid lightgrey",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            padding: 3, // Padding for the content inside the card
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2, // Adds space between the fields
            }}
          >
            {/* Trip Name TextField */}
            <TextField
              id="trip-name"
              label="Trip name"
              variant="outlined"
              margin="normal"
              value={tripName}
              onChange={(e) => {
                if (e.target.value.length <= 42) {
                  handleTripNameChange(e); // Update state if the length is <= 42
                }
              }}
              sx={{ ...textFieldColors, width: "55%" }}
            />

            {/* Start Date TextField */}
            <TextField
              id="start-date"
              label="Start date"
              type="date"
              variant="outlined"
              margin="normal"
              value={startDate}
              onChange={handleStartDateChange}
              inputRef={startDateInputRef}
              sx={DateFieldColors}
            />

            {/* End Date TextField */}
            <TextField
              id="end-date"
              label="End date"
              type="date"
              variant="outlined"
              margin="normal"
              value={endDate}
              onChange={handleEndDateChange}
              inputRef={endDateInputRef}
              sx={DateFieldColors}
            />

            {/* Description TextField */}
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={5}
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 410) {
                  handleDescriptionChange(e); // Update state if the length is <= 410
                }
              }}
              sx={textFieldColors}
            />
          </CardContent>

          <CardActions
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default NewTrip;
