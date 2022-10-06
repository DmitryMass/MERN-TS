import { Router, Request, Response } from 'express';
import { registration } from '../controllers/registration';
import { login } from '../controllers/login';
import { loginValidator, registerValidator } from '../validationScheme/auth';

const router = Router();

router.post('/registration', registerValidator, registration);

router.post('/login', loginValidator, login);

router.delete('/logout', async (req: Request, res: Response) => {
    return res
        .status(200)
        .clearCookie('newToken')
        .send({ message: 'Token Deleted' });
});

export default router;
