import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import { formatDate, calculateDayNumber } from '../../../utils/common.utils.js';
import { useCreateJourneyMutation } from '../../../redux/rtk/journeyDataApi.js';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function NewDayForm({ open, onClose, startDate, endDate }) {
    const { trip_id } = useParams();
    const [date, setDate] = useState(formatDate(startDate));
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [dateError, setDateError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [locationHelperText, setLocationHelperText] = useState('0/30 characters');
    const [descriptionHelperText, setDescriptionHelperText] = useState('0/120 characters');
    const [createJourney, { isLoading, error, data }] = useCreateJourneyMutation();
    const [localError, setLocalError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            setDate(value);
            setLocalError(false);
            setDateError(false);
        } else if (name === 'location') {
            if (value.length <= 30) {
                setLocation(value);
                setLocationError(false);
                setLocationHelperText(`${value.length}/30 characters`);
            }
        } else if (name === 'description') {
            if (value.length <= 120) {
                setDescription(value);
                setDescriptionHelperText(`${value.length}/120 characters`);
            }
        }
    };
    const resetStates = () => {
        setDate(formatDate(startDate));
        setLocation('');
        setDescription('');
        setDateError(false);
        setLocationError(false);
        setLocationHelperText('0/30 characters');
        setDescriptionHelperText('0/120 characters');
        onClose();
    };
    const handleClose = () => {
        resetStates();
        setLocalError(false);
        onClose();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!date) {
            console.log('Date is required');
            setDateError(true);
            isValid = false;
        }

        if (!location) {
            setLocationError(true);
            isValid = false;
        }

        const parsedDate = new Date(date.split('/').reverse().join('-'));
        // eslint-disable-next-line react/prop-types
        const parsedStartDate = new Date(startDate.split('/').reverse().join('-'));
        // eslint-disable-next-line react/prop-types
        const parsedEndDate = new Date(endDate.split('/').reverse().join('-'));

        if (parsedDate < parsedStartDate || parsedDate > parsedEndDate) {
            console.log('Date is not in the range');
            setDateError(true);
            isValid = false;
        }

        if (isValid) {
            const dayNumber = calculateDayNumber(
                new Date(date).toLocaleDateString('en-GB'),
                startDate,
                endDate,
            );
            const journeyData = {
                trip_id,
                day_number: dayNumber,
                country: location,
                description,
            };
            console.log('journeyData:', journeyData);
            try {
                await createJourney(journeyData).unwrap();
                /* let dateObj = new Date(date);
                dateObj.setDate(dateObj.getDate() + 1);
                let newDate = dateObj.toISOString().split('T')[0];
                console.log(newDate.split('-').reverse().join('/'));
                setDate(newDate.split('-').reverse().join('/'));*/
                resetStates();
                setLocalError(false);
            } catch (err) {
                console.error('Failed to create journey:', err.data.error);
                setLocalError(err.data.error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Day</DialogTitle>
            <DialogContent>
                <DialogContentText>Please provide the details for the day:</DialogContentText>
                <FormControl variant="standard" error={dateError}>
                    <InputLabel htmlFor="Date">Date*</InputLabel>
                    <Input
                        id="date"
                        type="date"
                        name="date"
                        value={date}
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
                    value={location}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    error={locationError}
                    maxLength={30}
                    helperText={locationHelperText}
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    value={description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    maxLength={120}
                    helperText={descriptionHelperText}
                />
                {localError && (
                    <p
                        style={{
                            color: 'red',
                        }}>{`${localError} (${new Date(date).toLocaleDateString('en-GB')})`}</p>
                )}
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className={'cancel-button'} onClick={resetStates}>
                    Cancel
                </Button>
                <Button className={'save-button'} type="submit" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
