import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

// eslint-disable-next-line react/prop-types
export function CustomAlert({ type, message, open, handleClose }) {

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ position: 'absolute' }}>
            <MuiAlert onClose={handleClose} severity={type}
                      sx={{ width: '100%', backgroundColor: 'rgba(255, 0, 0, 0.08)' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
