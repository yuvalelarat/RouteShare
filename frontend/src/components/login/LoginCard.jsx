import Button from '@mui/material/Button';
import { Box, CircularProgress, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomAlert } from '../common/CustomAlert.jsx';
import { formFields } from './constants.js';
import { useDispatch } from 'react-redux';
import { setToken, setTrips, setUserFirstName, setUserLastName } from '../../redux/slices/userDataSlice.js';
import { useLoginUserMutation } from '../../redux/rtk/userDataApi.js';
import './LoginCard.css';

function LoginCard() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const validateField = (fieldName, value) => {
        if (value.trim() === '') return true;
        return fieldName === 'email' && !/\S+@\S+\.\S+/.test(value);
    };

    const handleChange = (field) => (e) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: e.target.value
        }));

        if (errors[field] && e.target.value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false
            }));
        }
    };

    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(fields).forEach((field) => {
            const hasError = validateField(field, fields[field]);
            if (hasError) {
                isValid = false;
                newErrors[field] = true;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            setAlertOpen(false);
            try {
                const response = await loginUser(fields).unwrap();
                console.log('Login successful:', response);
                dispatch(setToken(response.token));
                dispatch(setUserFirstName(response.user.first_name));
                dispatch(setUserLastName(response.user.last_name));
                dispatch(setTrips(response.trips));

                const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; //2 hours in milliseconds
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        token: response.token,
                        firstName: response.user.first_name,
                        lastName: response.user.last_name,
                        trips: response.trips,
                        expiresAt: expirationTime
                    })
                );

                navigate('/my-trips');
            } catch (err) {
                console.error('Login failed:', err);
                setAlertMessage(err.data?.message || 'Login failed. Please try again.');
                setAlertOpen(true);
            }
        } else {
            setAlertMessage('Both email and password are required.');
            setAlertOpen(true);
        }
    };

    const handleAlertClose = () => setAlertOpen(false);

    const handleNavigate = (action) => {
        if (action === 'register') {
            navigate('/register');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Box sx={boxStyle}>
            <CustomAlert
                type="error"
                message={alertMessage}
                open={alertOpen}
                handleClose={handleAlertClose}
            />
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    {formFields.map((field) => (
                        <TextField
                            key={field.name}
                            label={field.label}
                            variant="outlined"
                            type={field.type}
                            value={fields[field.name]}
                            onChange={handleChange(field.name)}
                            error={errors[field.name]}
                            helperText={errors[field.name] ? field.helperText : ''}
                            {...(field.name === 'password' && { onKeyDown: handleKeyDown })}
                        />
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', maxWidth: '21.5rem' }}>
                    <Button
                        variant="outlined"
                        className="register-button"
                        onClick={() => handleNavigate('register')}
                        disabled={isLoading}>
                        Register
                    </Button>

                    {isLoading ? (
                        <CircularProgress size="30px" />

                    ) : (
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={handleSubmit}
                            className="login-button"
                            disabled={isLoading}>
                            Login {/*TODO: Add loading spinner*/}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
}

export default LoginCard;
