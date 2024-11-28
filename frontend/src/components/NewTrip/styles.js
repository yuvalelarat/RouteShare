export const textFieldColors = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
};

export const DateFieldColors = {
  width: "35%",
  "& .MuiInputLabel-root": {
    paddingLeft: "20px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    paddingLeft: "0px",
    color: "black",
  },
  "@media (max-width: 850px)": {
    "& .MuiInputLabel-root": {
      transform: "translate(0, -1.5rem)",
      paddingLeft: "0px", 
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiInputBase-root": {
      fontSize: "0.875rem",
    },
  },
  "@media (max-width: 480px)": {
    "& .MuiInputBase-root": {
      fontSize: "0.7rem",
    },
  },
  "@media (max-width: 420px)": {
    "& .MuiInputBase-root": {
      fontSize: "0.58rem",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
};

export const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "16px",
};

export const cardStyle = {
  minWidth: 275,
  width: "50rem",
  boxShadow: "-4px 4px 4px rgba(0, 0, 0, 0.2)",
  marginTop: 3,
  border: "1px solid lightgrey",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  padding: 3,
  "@media (max-width: 900px)": {
    width: "80%",
    padding: "2rem",
  },
  "@media (max-width: 600px)": {
    width: "90%",
    padding: "1rem",
  },
};

export const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
