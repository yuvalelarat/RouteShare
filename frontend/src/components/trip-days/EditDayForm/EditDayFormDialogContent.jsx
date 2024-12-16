import PropTypes from 'prop-types';
import {
    DialogContent,
    DialogContentText,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from '@mui/material';
import { formatDate } from '../../../utils/common.utils';

export function EditDayFormDialogContent({ formState, handleChange, startDate, endDate }) {
    const {
        newDate,
        newLocation,
        newDescription,
        dateError,
        locationError,
        localError,
        locationHelperText,
        descriptionHelperText,
    } = formState;

    return (
        <DialogContent>
            <DialogContentText>Please provide the new desired details for the day:</DialogContentText>
            <FormControl variant="standard" error={dateError}>
                <InputLabel htmlFor="Date">Date*</InputLabel>
                <Input
                    id="date"
                    type="date"
                    name="date"
                    value={newDate}
                    className={'date'}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    inputProps={{ min: formatDate(startDate), max: formatDate(endDate) }}
                />
            </FormControl>
            <TextField
                required
                margin="dense"
                id="location"
                name="location"
                label="Country/City"
                value={newLocation}
                error={locationError}
                fullWidth
                onChange={handleChange}
                variant="outlined"
                maxLength={30}
                helperText={locationHelperText}
            />
            <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                multiline
                rows={3}
                value={newDescription}
                fullWidth
                onChange={handleChange}
                variant="outlined"
                maxLength={120}
                helperText={descriptionHelperText}
            />
            {localError && (
                <p
                    style={{
                        color: 'red',
                    }}>{`${localError} (${new Date(newDate).toLocaleDateString('en-GB')})`}</p>
            )}
        </DialogContent>
    );
}

EditDayFormDialogContent.propTypes = {
    formState: PropTypes.shape({
        newDate: PropTypes.string.isRequired,
        newLocation: PropTypes.string.isRequired,
        newDescription: PropTypes.string.isRequired,
        dateError: PropTypes.bool.isRequired,
        locationError: PropTypes.bool.isRequired,
        localError: PropTypes.string,
        locationHelperText: PropTypes.string.isRequired,
        descriptionHelperText: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
};
