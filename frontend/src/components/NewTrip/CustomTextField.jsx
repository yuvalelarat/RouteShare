import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = forwardRef(({ id, label, type, value, onChange, multiline, rows, sx, ...rest }, ref) => (
  <TextField
    id={id}
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    multiline={multiline}
    rows={rows}
    inputRef={ref}
    variant="outlined"
    margin="normal"
    sx={sx}
    {...rest}
  />
));

export default CustomTextField;
