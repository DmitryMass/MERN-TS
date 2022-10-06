import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { sign, verify } from 'jsonwebtoken';
import { IAuth } from '../Types/userType';
import { compare } from 'bcrypt';

function jwtToken(id: string, email: string) {
    return sign(
        {
            id,
            email,
        },
        process.env.SECRET_KEY!,
        { expiresIn: '1h' }
    );
}

export const login: RequestHandler = async (req, res) => {
    try {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (Email or Password).',
            });
        }

        const { email, password } = req.body as IAuth;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ info: 'User not found' });
        }

        if (user && (await compare(password, user.password))) {
            const newToken = jwtToken(user.id, user.email);
            return res
                .status(200)
                .cookie('newToken', newToken)
                .send({ message: 'U are welcom.' });
            // нужно додумать куки или хедеры для фронта. Токен отправлять в куки
        }
    } catch (e) {
        return res.status(500).json({ message: 'Server error, try again.' });
    }
};
