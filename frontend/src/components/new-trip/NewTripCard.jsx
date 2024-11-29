import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { CustomAlert } from '../common/CustomAlert.jsx';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { boxStyle, cardStyle, cardContentStyle } from './styles';
import './NewTripCard.css';

function NewTripCard() {
    const [formValues, setFormValues] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        tripName: false,
        startDate: false,
        endDate: false
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();


    const handleFieldChange = (key, value) => {
        setErrors((prev) => ({ ...prev, [key]: false }));
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleNavigate = () => {
        navigate('/');
    };


    const handleSave = () => {
        const newErrors = {
            tripName: !formValues.tripName,
            startDate: !formValues.startDate,
            endDate: !formValues.endDate
        };
        if (newErrors.tripName || newErrors.startDate || newErrors.endDate) {
            setErrors(newErrors);
            setAlertMessage('Please fill out all required fields.');
            setAlertOpen(true);
        } else {
            console.log('Save clicked');
            //TODO: Save the form data
            setErrors({
                tripName: false,
                startDate: false,
                endDate: false
            });
            setAlertOpen(false);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert manually when clicked
    };


    return (
        <>
            <Box sx={boxStyle}>
                <CustomAlert
                    type="error"
                    message={alertMessage}
                    open={alertOpen}
                    handleClose={handleAlertClose}
                />
                <Card sx={cardStyle}>
                    <CardContent sx={cardContentStyle}>
                        <TextField
                            id="trip-name"
                            label="Trip name*"
                            variant="standard"
                            value={formValues.tripName}
                            className="trip-name"
                            onChange={(e) => handleFieldChange('tripName', e.target.value)}
                            error={errors.tripName}
                        />
                        <FormControl variant="standard" type="date" error={errors.startDate}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Start Date*
                            </InputLabel>
                            <Input
                                id="start-date"
                                type="date"
                                value={formValues.startDate}
                                className="date-field"
                                onChange={(e) => handleFieldChange('startDate', e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" type="date" error={errors.endDate}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                                End Date*
                            </InputLabel>
                            <Input
                                id="end-date"
                                type="date"
                                value={formValues.endDate}
                                className="date-field"
                                onChange={(e) => handleFieldChange('endDate', e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={5}
                            value={formValues.description}
                            className="description"
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            disableElevation={true}
                            color="error"
                            onClick={handleNavigate}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation={true}
                            color="success"
                            onClick={handleSave}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default NewTripCard;
