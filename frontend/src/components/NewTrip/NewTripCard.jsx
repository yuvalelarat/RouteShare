import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { boxStyle, cardStyle, cardContentStyle } from "./styles.js";
import { today, fieldsConfig } from "./constants.js";

function NewTripCard() {
  const [formValues, setFormValues] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleFieldChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (startDateInputRef.current) {
      startDateInputRef.current.setAttribute("min", today);
    }
  }, []);

  useEffect(() => {
    if (endDateInputRef.current && formValues.startDate) {
      endDateInputRef.current.setAttribute("min", formValues.startDate);
    }
  }, [formValues.startDate]);

  return (
    <>
      <Box sx={boxStyle}>
        <Card sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            {fieldsConfig.map((field) => (
              <CustomTextField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={formValues[field.valueKey]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!field.maxLength || value.length <= field.maxLength) {
                    handleFieldChange(field.valueKey, value);
                  }
                }}
                ref={field.refKey ? eval(field.refKey) : undefined}
                multiline={field.multiline || false}
                rows={field.rows || undefined}
                sx={field.sx}
              />
            ))}
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log("Save clicked")}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default NewTripCard;
