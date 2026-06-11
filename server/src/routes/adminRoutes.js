import express from 'express';
import { stats, listUsers, updateUser } from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/auth.js';

export const adminRouter = express.Router();

adminRouter.use(protect, authorize('admin'));
adminRouter.get('/stats', stats);
adminRouter.get('/users', listUsers);
adminRouter.patch('/users/:id', updateUser);
