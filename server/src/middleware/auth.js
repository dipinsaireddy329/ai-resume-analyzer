import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export async function protect(req, _res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : req.cookies?.token;
  if (!token) return next(new AppError('Authentication required', 401));

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User no longer exists', 401));
    req.user = user;
    return next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
    return next();
  };
}
