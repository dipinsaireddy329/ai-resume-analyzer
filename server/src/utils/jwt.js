import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function sendAuth(res, user, statusCode = 200) {
  const token = signToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: env.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.status(statusCode).json({ success: true, token, user });
}
