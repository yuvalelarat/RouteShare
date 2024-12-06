import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import { calculateDayNumber, formatDate } from '../../../utils/common.utils.js';
import { useContext, useState } from 'react';
import TripContext from '../../../context/TripContext.js';
import { useEditJourneyMutation } from '../../../redux/rtk/journeyDataApi.js';

export default function NewDayForm({
    open,
    onClose,
    dayNumber,
    date,
    country,
    description,
    startDate,
    endDate,
    journeyId,
}) {
    const { trip_id, newJourneyDetails } = useContext(TripContext);
    const [newDate, setNewDate] = useState(formatDate(date));
    const [newLocation, setNewLocation] = useState(country);
    const [newDescription, setNewDescription] = useState(description);
    const [dateError, setDateError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [locationHelperText, setLocationHelperText] = useState(`${country.length}/30 characters`);
    const [descriptionHelperText, setDescriptionHelperText] = useState(
        `${description.length}/120 characters`,
    );
    const [editJourney, { isLoading, error, data }] = useEditJourneyMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            setNewDate(value);
            setLocalError(false);
            setDateError(false);
        } else if (name === 'location') {
            if (value.length <= 30) {
                setNewLocation(value);
                setLocationError(false);
                setLocationHelperText(`${value.length}/30 characters`);
            }
        } else if (name === 'description') {
            if (value.length <= 120) {
                setNewDescription(value);
                setDescriptionHelperText(`${value.length}/120 characters`);
            }
        }
    };

    const handleClose = () => {
        resetStates();
        setLocalError(false);
        onClose();
    };

    const resetStates = () => {
        setNewDate(formatDate(startDate));
        setNewLocation(country);
        setNewDescription(description);
        setDateError(false);
        setLocationError(false);
        setLocationHelperText(`${country.length}/30 characters`);
        setDescriptionHelperText(`${description.length}/120 characters`);
        onClose();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!newDate) {
            setLocalError('Date is required');
            setDateError(true);
            isValid = false;
        }

        if (!newLocation) {
            setLocalError('Country/City is required');
            setLocationError(true);
            isValid = false;
        }
        const parsedDate = new Date(newDate.split('/').reverse().join('-'));
        // eslint-disable-next-line react/prop-types
        const parsedStartDate = new Date(startDate.split('/').reverse().join('-'));
        // eslint-disable-next-line react/prop-types
        const parsedEndDate = new Date(endDate.split('/').reverse().join('-'));

        if (parsedDate < parsedStartDate || parsedDate > parsedEndDate) {
            setLocalError('Date is not in the range');
            setDateError(true);
            isValid = false;
        }

        if (isValid) {
            const dayNumber = calculateDayNumber(
                new Date(newDate).toLocaleDateString('en-GB'),
                startDate,
                endDate,
            );
            const newJourneyData = {
                trip_id,
                journey_id: journeyId,
                day_number: dayNumber,
                country: newLocation,
                description: newDescription,
            };
            console.log('newJourneyData:', newJourneyData);
            try {
                await editJourney(newJourneyData).unwrap();
                resetStates();
                setLocalError(false);
                newJourneyDetails(journeyId, newDate, dayNumber, newLocation, newDescription);
            } catch (err) {
                console.error('Failed to create journey:', err);
                setLocalError(err.data.error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{`Edit: ${date} - day ${dayNumber}`}</DialogTitle>
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
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className={'cancel-button'} onClick={handleClose}>
                    Cancel
                </Button>
                <Button className={'save-button'} type="submit" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
