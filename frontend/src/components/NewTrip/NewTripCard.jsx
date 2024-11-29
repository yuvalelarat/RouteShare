import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { boxStyle, cardStyle, cardContentStyle } from "./styles";

function NewTripCard() {
  const [formValues, setFormValues] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  return (
    <>
      <Box sx={boxStyle}>
        <Card sx={cardStyle}>
          <CardContent sx={cardContentStyle}></CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button variant="contained" disableElevation={true} color="error">
              Cancel
            </Button>
            <Button variant="contained" disableElevation={true} color="success">
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default NewTripCard;
