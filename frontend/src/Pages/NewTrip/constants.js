export const textFieldColors = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black", //Outline color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "black", //Outline color when focused
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black", //Label color when focused
    },
  };
  
  export const DateFieldColors = {
    width: "35%",
    "& .MuiInputLabel-root": {
      paddingLeft: "20px", // Adjust this value to move the label text to the right
    },
    "& .MuiInputLabel-root.Mui-focused": {
      paddingLeft: "0px", // Remove padding when the label is focused (clicked)
      color: "black", //Label color when focused
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black", //Outline color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "black", //Outline color when focused
      },
    },
  };
  