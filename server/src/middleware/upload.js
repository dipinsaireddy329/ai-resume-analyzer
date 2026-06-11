import path from 'path';
import multer from 'multer';
import { nanoid } from 'nanoid';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${nanoid(10)}${path.extname(file.originalname).toLowerCase()}`);
  }
});

export const uploadResume = multer({
  storage,
  limits: { fileSize: env.maxFileSizeMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new AppError('Only PDF files are supported', 400));
    return cb(null, true);
  }
});
