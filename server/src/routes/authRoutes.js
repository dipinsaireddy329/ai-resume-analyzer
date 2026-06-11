import express from 'express';
import { forgotPassword, login, logout, me, register, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';
import { validate } from '../middleware/validate.js';
import { forgotPasswordValidator, loginValidator, registerValidator, resetPasswordValidator } from '../validators/authValidators.js';

export const authRouter = express.Router();

authRouter.post('/register', authLimiter, registerValidator, validate, register);
authRouter.post('/login', authLimiter, loginValidator, validate, login);
authRouter.post('/forgot-password', authLimiter, forgotPasswordValidator, validate, forgotPassword);
authRouter.post('/reset-password', authLimiter, resetPasswordValidator, validate, resetPassword);
authRouter.post('/logout', protect, logout);
authRouter.get('/me', protect, me);
