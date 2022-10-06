import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { hash } from 'bcrypt';
import { IAuth, IUser } from '../Types/userType';
import User from '../models/User';

export const registration: RequestHandler = async (req, res) => {
    try {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (Email or Password).',
            });
        }

        const { email, password } = req.body as IAuth;

        const registerUser = await User.findOne({ email });
        if (registerUser) {
            return res.status(400).send({ message: 'User already exists.' });
        }

        const user = new User<IUser>({
            email,
            password: await hash(password, 10),
        });

        await user.save();

        return res.status(200).send({ message: 'User was created.' });
    } catch (e) {
        res.status(500).json({ message: 'Server error, try again.' });
    }
};
