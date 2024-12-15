import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// eslint-disable-next-line react/prop-types
export default function DeleteDialog({ open, close, handleDelete, dialogTitle, dialogContentText }) {
    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialogContentText}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <Button variant={'contained'} disableElevation onClick={close} className={'save-button'}>
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    disableElevation
                    className={'cancel-button'}
                    onClick={() => {
                        handleDelete();
                        close();
                    }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
