import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 80 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isStrongPassword({ minLength: 8, minNumbers: 1, minSymbols: 0, minUppercase: 1 })
];

export const loginValidator = [body('email').isEmail().normalizeEmail(), body('password').notEmpty()];

export const forgotPasswordValidator = [body('email').isEmail().normalizeEmail()];

export const resetPasswordValidator = [
  body('token').notEmpty(),
  body('password').isStrongPassword({ minLength: 8, minNumbers: 1, minSymbols: 0, minUppercase: 1 })
];
