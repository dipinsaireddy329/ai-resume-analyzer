import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadResume as uploadMiddleware } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { analyzeResume, deleteResume, downloadReport, getResume, listResumes, uploadResume } from '../controllers/resumeController.js';
import { listResumeValidator, uploadValidator } from '../validators/resumeValidators.js';

export const resumeRouter = express.Router();

resumeRouter.use(protect);
resumeRouter.get('/', listResumeValidator, validate, listResumes);
resumeRouter.post('/', uploadMiddleware.single('resume'), uploadValidator, validate, uploadResume);
resumeRouter.get('/:id', getResume);
resumeRouter.post('/:id/analyze', analyzeResume);
resumeRouter.get('/:id/report', downloadReport);
resumeRouter.delete('/:id', deleteResume);
