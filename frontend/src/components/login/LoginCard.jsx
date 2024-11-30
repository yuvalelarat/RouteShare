import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomAlert } from '../common/CustomAlert.jsx';
import { formFields } from './constants.js';

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
    const navigate = useNavigate();

    const validateField = (fieldName, value) => {
        if (value.trim() === '') return true;
        if (fieldName === 'email' && !/\S+@\S+\.\S+/.test(value)) return true;
        return false;
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

    const handleSubmit = () => {
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
            navigate('/'); // TODO: Navigate on successful validation
        } else {
            setAlertOpen(true);
        }
    };

    const handleAlertClose = () => setAlertOpen(false);

    const handleNavigate = (action) => {
        if (action === 'register') {
            navigate('/register');
        } else {
            navigate('/'); // Navigate on successful login (or validation)
        }
    };

    return (
        <Box sx={boxStyle}>
            <CustomAlert
                type="error"
                message="Both email and password required."
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
                        />
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={() => handleNavigate('register')}>
                        Register
                    </Button>
                    <Button variant="contained" disableElevation={true} onClick={handleSubmit}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default LoginCard;
