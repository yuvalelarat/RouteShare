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
import './RegisterCard.css';

function LoginCard() {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();

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

    const validateField = (fieldName, value) => {
        const field = formFields.find((field) => field.name === fieldName);
        return field?.validate(value);
    };

    const handleSubmit = () => {
        let isValid = true;
        const newErrors = {};

        // Validate each field based on the form configuration
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


    return (
        <Box sx={boxStyle}>
            <CustomAlert
                type="error"
                message="All fields are required."
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
                <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button variant="contained" disableElevation onClick={handleSubmit} className={'login-button'}>
                        Register
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default LoginCard;
