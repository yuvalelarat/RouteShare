import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken, verifyJwt } from '../utils/jwt.js';
import dataSource from '../db/connection.js';
import { sendVerificationEmail } from '../utils/mailVerification.js';

const userRepository = dataSource.getRepository(User);

export const createUser = async (email, password, first_name, last_name) => {
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
        throw new Error('A user with this email already exists.');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
        email,
        password_hash: passwordHash,
        first_name,
        last_name,
        email_verified: false
    });

    const savedUser = await userRepository.save(newUser);

    const token = generateToken(savedUser.user_id, savedUser.email);

    await sendVerificationEmail(savedUser.email, token);

    return savedUser;
};

export const verifyEmailService = async (token) => {
    try {
        const decoded = verifyJwt(token);
        console.log('decoded Token:', decoded);

        const user = await userRepository.findOneBy({ user_id: decoded.user_id });

        if (!user) {
            throw new Error('Invalid token');
        }

        user.email_verified = true;
        await userRepository.save(user);

        return { success: true, message: 'Email verified successfully' };
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

export const loginService = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!user.email_verified) {
        throw new Error('Email not verified');
    }

    const isPasswordValid = await validatePassword(password, user.password_hash);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateAuthToken(user);

    return { token, user };
};

export const findUserByEmail = async (email) => {
    return await userRepository.findOneBy({ email });
};

export const validatePassword = async (inputPassword, storedPasswordHash) => {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
};

export const generateAuthToken = (user) => {
    return generateToken(user.user_id, user.email);
};

export const getAllUsers = async () => {
    return await userRepository.find();
};
