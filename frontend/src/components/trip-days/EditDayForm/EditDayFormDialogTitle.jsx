import PropTypes from 'prop-types';
import { DialogTitle } from '@mui/material';

export function EditDayFormDialogTitle({ date, dayNumber }) {
    return <DialogTitle>{`Edit: ${date} - day ${dayNumber}`}</DialogTitle>;
}

EditDayFormDialogTitle.propTypes = {
    date: PropTypes.string.isRequired,
    dayNumber: PropTypes.number.isRequired,
};
