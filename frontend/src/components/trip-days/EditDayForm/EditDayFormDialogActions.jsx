import PropTypes from 'prop-types';
import { DialogActions, Button } from '@mui/material';

export function EditDayFormDialogActions({ handleClose, handleSave }) {
    return (
        <DialogActions style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button className={'cancel-button'} onClick={handleClose}>
                Cancel
            </Button>
            <Button className={'save-button'} type="submit" onClick={handleSave}>
                Save
            </Button>
        </DialogActions>
    );
}

EditDayFormDialogActions.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
};
