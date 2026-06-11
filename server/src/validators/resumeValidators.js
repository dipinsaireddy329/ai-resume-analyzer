import { body, query } from 'express-validator';

export const uploadValidator = [body('targetRole').optional().trim().isLength({ max: 120 })];
export const listResumeValidator = [
  query('search').optional().trim().isLength({ max: 120 }),
  query('status').optional().isIn(['uploaded', 'parsed', 'analyzed', 'failed'])
];
