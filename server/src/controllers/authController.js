import crypto from 'crypto';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { sendAuth } from '../utils/jwt.js';

export async function register(req, res, next) {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) throw new AppError('Email is already registered', 409);
    const user = await User.create(req.body);
    sendAuth(res, user, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) throw new AppError('Invalid email or password', 401);
    user.lastLoginAt = new Date();
    await user.save();
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
}

export function logout(_req, res) {
  res.clearCookie('token').json({ success: true, message: 'Logged out' });
}

export async function me(req, res) {
  res.json({ success: true, user: req.user });
}

export async function forgotPassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+passwordResetToken +passwordResetExpires');
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
      user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
      await user.save({ validateBeforeSave: false });
      return res.json({
        success: true,
        message: env.nodeEnv === 'production' ? 'If that email exists, reset instructions were created' : 'Password reset token generated',
        resetToken: env.nodeEnv === 'production' ? undefined : token
      });
    }
    return res.json({ success: true, message: 'If that email exists, reset instructions were created' });
  } catch (error) {
    return next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const hashed = crypto.createHash('sha256').update(req.body.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: new Date() }
    }).select('+passwordResetToken +passwordResetExpires');
    if (!user) throw new AppError('Invalid or expired reset token', 400);
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
}
