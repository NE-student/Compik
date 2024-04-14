import {body} from 'express-validator';

export const registerValidation = [
    body('email', "Incorrect format of email address.").isEmail(),
    body('password', "Password must be more than 5 symbols.").isLength({min:6}),
    body('Nickname', "Nickname must be more than 2 symbols.").isLength({min: 3})
];

export const loginValidation = [
    body('email', "Incorrect format of email address.").isEmail(),
]