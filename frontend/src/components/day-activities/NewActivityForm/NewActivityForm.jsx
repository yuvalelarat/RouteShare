import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLazyGetParticipantsQuery } from '../../../redux/rtk/participantsDataApi.js';
import { useCreateActivityMutation } from '../../../redux/rtk/activityDataApi.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { activityTypeList } from './constants.js';

// eslint-disable-next-line react/prop-types
export default function NewActivityForm({ open, onClose, date, country }) {
    const [getParticipants, { data: ParticipantsData, error: ParticipantsError, isLoading }] =
        useLazyGetParticipantsQuery();
    const [createActivity, { isLoading: isCreating, error: createError }] = useCreateActivityMutation();
    const { trip_id, journey_id } = useParams();
    const [activityType, setActivityType] = useState('');
    const [activityName, setActivityName] = useState('');
    const [location, setLocation] = useState('');
    const [cost, setCost] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [description, setDescription] = useState('');
    const [activityNameError, setActivityNameError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [costError, setCostError] = useState(false);
    const [paidByError, setPaidByError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [activityTypeError, setActivityTypeError] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [activityNameHelperText, setActivityNameHelperText] = useState('0/20 characters');
    const [locationHelperText, setLocationHelperText] = useState('0/20 characters');
    const [descriptionHelperText, setDescriptionHelperText] = useState('0/100 characters');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ActivityName') {
            if (value.length <= 20) {
                setActivityName(value);
                setActivityNameError(false);
                setActivityNameHelperText(`${value.length}/20 characters`);
            }
        } else if (name === 'location') {
            if (value.length <= 20) {
                setLocation(value);
                setLocationError(false);
                setLocationHelperText(`${value.length}/20 characters`);
            }
        } else if (name === 'cost') {
            const regex = /^\d{0,7}(\.\d{0,2})?$/;
            if (regex.test(value)) {
                const parsedValue = parseFloat(value).toFixed(2);
                setCost(Number(parsedValue));
                setCostError(false);
            }
        } else if (name === 'paidBy') {
            setPaidBy(value);
            setPaidByError(false);
        } else if (name === 'description') {
            if (value.length <= 100) {
                setDescription(value);
                setDescriptionError(false);
                setDescriptionHelperText(`${value.length}/100 characters`);
            }
        } else if (name === 'ActivityType') {
            setActivityType(value);
            setActivityTypeError(false);
        }
    };

    const resetStates = () => {
        setActivityType('');
        setActivityName('');
        setLocation('');
        setCost('');
        setPaidBy('');
        setDescription('');
        setLocalError(null);
        setActivityNameError(false);
        setLocationError(false);
        setCostError(false);
        setPaidByError(false);
        setDescriptionError(false);
        setActivityTypeError(false);
        setActivityNameHelperText('0/20 characters');
        setLocationHelperText('0/20 characters');
        setDescriptionHelperText('0/100 characters');
    };
    const handleClose = () => {
        onClose();
        resetStates();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (
            activityName.length > 20 ||
            !activityName ||
            location.length > 20 ||
            !location ||
            !cost ||
            cost <= 0 ||
            description.length > 100 ||
            !activityTypeList.includes(activityType) ||
            !ParticipantsData?.participants.some((participant) => participant.user_id === paidBy)
        ) {
            setActivityNameError(activityName.length > 20 || !activityName);
            setLocationError(location.length > 20 || !location);
            setCostError(!cost || cost <= 0);
            setDescriptionError(description.length > 100);
            setActivityTypeError(!activityTypeList.includes(activityType));
            setPaidByError(
                !ParticipantsData?.participants.some((participant) => participant.user_id === paidBy),
            );
            setLocalError('Please notice the red required fields');
            isValid = false;
        }

        if (!isValid) return;
        try {
            await createActivity({
                journey_id: journey_id,
                activity_name: activityName,
                location,
                activity_type: activityType,
                cost,
                paid_by: paidBy,
            }).unwrap();
            resetStates();
            onClose();
        } catch (err) {
            console.error('Failed to create activity:', err.message || err);
            setLocalError('Failed to create activity');
        }
    };

    useEffect(() => {
        if (trip_id) {
            getParticipants(trip_id);
        }
    }, [trip_id, getParticipants]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Add an activity in ${country} on ${date}.`}</DialogContentText>
                <TextField
                    required
                    id="ActivityName"
                    name="ActivityName"
                    label="Activity name"
                    value={activityName}
                    onChange={handleOnChange}
                    fullWidth
                    margin={'dense'}
                    variant="standard"
                    error={activityNameError}
                    helperText={activityNameHelperText}
                />
                <FormControl sx={{ minWidth: 150 }} size="small" margin={'dense'} variant={'standard'}>
                    <InputLabel id="demo-select-small-label">Activity type</InputLabel>
                    <Select
                        required
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="ActivityType"
                        onChange={handleOnChange}
                        value={activityType}
                        error={activityTypeError}
                        label="Who pays?">
                        {activityTypeList.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin={'dense'}
                    id="location"
                    name="location"
                    label="location"
                    value={location}
                    error={locationError}
                    onChange={handleOnChange}
                    fullWidth
                    variant="standard"
                    helperText={locationHelperText}
                />
                <TextField
                    required
                    id="cost"
                    name="cost"
                    label="cost ($)"
                    type={'number'}
                    value={cost}
                    error={costError}
                    onChange={handleOnChange}
                    fullWidth
                    variant="standard"
                    margin={'dense'}
                />
                <FormControl sx={{ minWidth: 150 }} size="small" margin={'dense'} variant={'standard'}>
                    <InputLabel id="demo-select-small-label">Who pays?</InputLabel>
                    <Select
                        required
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={paidBy}
                        error={paidByError}
                        name="paidBy"
                        onChange={handleOnChange}
                        label="Who pays?">
                        <MenuItem value="">
                            <em>Equal payment</em>
                        </MenuItem>
                        {ParticipantsData?.participants.map((participant, index) => (
                            <MenuItem key={index} value={participant.user_id}>
                                {`${participant.first_name} ${participant.last_name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    value={description}
                    onChange={handleOnChange}
                    multiline
                    error={descriptionError}
                    rows={3}
                    fullWidth
                    margin={'dense'}
                    variant="outlined"
                    maxLength={100}
                    helperText={descriptionHelperText}
                />
                {localError && (
                    <p
                        style={{
                            color: 'red',
                        }}>{`${localError}`}</p>
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
