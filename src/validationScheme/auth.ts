import { check } from 'express-validator';

export const registerValidator = [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
        min: 6,
    }),
];
export const loginValidator = [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
];
