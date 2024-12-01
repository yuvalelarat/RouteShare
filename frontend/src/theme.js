// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, serif'
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'black'
                },
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'grey'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: 'black'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'black'
                        }
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'black'
                    },
                    '&.Mui-error': {
                        color: 'red'
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid black'
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '2px solid black'
                    },
                    '&.Mui-error:after': {
                        borderBottom: '2px solid red'
                    },
                    '&.Mui-error:before': {
                        borderBottom: '2px solid red'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'Poppins, serif',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    fontSize: '16px'
                }
            }
        }
    }
});

export default theme;
