import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomAlert } from '../common/CustomAlert.jsx';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();

    const handleNavigate = (click) => {
        if (click === 'signUp') {
            navigate('/'); //TODO: Add link to sign up page
        } else {
            navigate('/'); //TODO: Add login validations
        }
    };

    const handleSubmit = () => {
        let valid = true;
        if (!email) {
            setEmailError(true);
            valid = false;
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            valid = false;
        } else {
            setPasswordError(false);
        }

        if (!valid) {
            setAlertOpen(true);
        } else {
            setAlertOpen(false);
            handleNavigate('/'); //TODO: add login validations
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError && e.target.value) {
            setEmailError(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError && e.target.value) {
            setPasswordError(false);
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
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? 'Email is required' : ''}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                    />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            console.log('sign up clicked');
                            handleNavigate('signUp');
                        }}>
                        Sign up
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
