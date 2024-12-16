import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { CustomAlert } from '../common/CustomAlert.jsx';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { fields } from './constants.js';
import { Box, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { boxStyle, cardStyle, cardContentStyle } from './styles';
import './NewTripCard.css';
import { formatDateToApi } from '../../utils/common.utils.js';
import { useCreateTripMutation, useGetMyTripsQuery } from '../../redux/rtk/tripsDataApi.js';

function NewTripCard() {
    const [formValues, setFormValues] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const [errors, setErrors] = useState({
        tripName: false,
        startDate: false,
        endDate: false,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error');

    const navigate = useNavigate();
    const [createTrip, { isLoading, isError, error }] = useCreateTripMutation();
    const { refetch } = useGetMyTripsQuery();

    const handleFieldChange = (key, value) => {
        setErrors((prev) => ({ ...prev, [key]: false }));

        if (key === 'tripName') {
            if (value.length > 35) value = value.slice(0, 35);
        }

        if (key === 'description') {
            if (value.length > 350) value = value.slice(0, 350);
        }

        //validation: ensure endDate is not earlier than startDate
        if (key === 'startDate' && formValues.endDate && value > formValues.endDate) {
            setErrors((prev) => ({ ...prev, endDate: true }));
        }
        if (key === 'endDate' && value < formValues.startDate) {
            setErrors((prev) => ({ ...prev, endDate: true }));
        }
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleNavigate = () => {
        navigate('/my-trips');
    };

    const resetFormValues = () => {
        setFormValues({
            tripName: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const newErrors = {
            tripName: !formValues.tripName,
            startDate: !formValues.startDate,
            endDate: !formValues.endDate,
        };
        if (newErrors.tripName || newErrors.startDate || newErrors.endDate) {
            setErrors(newErrors);
            setAlertMessage('Please fill out all required fields.');
            setAlertOpen(true);
        } else {
            console.log('Save clicked');
            setErrors({
                tripName: false,
                startDate: false,
                endDate: false,
            });
            setAlertOpen(false);
            try {
                const response = await createTrip({
                    trip_name: formValues.tripName,
                    start_date: formatDateToApi(formValues.startDate),
                    end_date: formatDateToApi(formValues.endDate),
                    description: formValues.description,
                }).unwrap();
                setAlertType('success');
                setAlertMessage('Trip created successfully.');
                setAlertOpen(true);
                refetch();
                navigate('/my-trips');
            } catch (error) {
                console.error('Error creating trip:', error);
                setAlertMessage(error.data.error);
                setAlertOpen(true);
            }
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Box sx={boxStyle}>
            <CustomAlert
                type={alertType}
                message={alertMessage}
                open={alertOpen}
                handleClose={handleAlertClose}
            />
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    {fields.map((field) => {
                        const minValue = field.min || (field.getMin && field.getMin(formValues));
                        const helperText = field.helperText
                            ? field.helperText(formValues[field.valueKey] || '')
                            : '';
                        return field.multiline ? (
                            <TextField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                variant="outlined"
                                error={
                                    field.id !== 'description' &&
                                    (field.errorKey ? errors[field.errorKey] : false)
                                }
                                multiline={field.multiline || false}
                                rows={field.rows || undefined}
                                value={formValues[field.valueKey]}
                                className={field.id}
                                onChange={(e) => {
                                    const maxLength = field.maxLength || Infinity;
                                    const value = e.target.value.slice(0, maxLength);
                                    handleFieldChange(field.valueKey, value);
                                }}
                                helperText={helperText}
                            />
                        ) : (
                            <FormControl
                                key={field.id}
                                variant="standard"
                                error={field.errorKey ? errors[field.errorKey] : false}>
                                <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                                <Input
                                    id={field.id}
                                    type={field.type}
                                    value={formValues[field.valueKey]}
                                    className={field.id}
                                    onChange={(e) => handleFieldChange(field.valueKey, e.target.value)}
                                    inputProps={minValue ? { min: minValue } : {}}
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                />
                            </FormControl>
                        );
                    })}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', maxWidth: '46.5rem' }}>
                    <Button
                        variant="contained"
                        disableElevation
                        className={'cancel-button'}
                        onClick={handleNavigate}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        className={'save-button'}
                        onClick={handleSave}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default NewTripCard;
