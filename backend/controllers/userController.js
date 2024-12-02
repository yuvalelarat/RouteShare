import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const savedUser = await userService.createUser(email, password, first_name, last_name);
        res.status(201).json({ success: true, user: savedUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: err.message
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user, trips } = await userService.loginService(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            trips
        });
    } catch (err) {
        console.error('Error logging in:', err);

        if (err.message === 'Invalid email or password') {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (err.message === 'Email not verified') {
            return res.status(403).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: err.message
        });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const result = await userService.verifyEmailService(token);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error verifying email:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: err.message
        });
    }
};
