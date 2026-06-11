import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { adminRouter } from './routes/adminRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { resumeRouter } from './routes/resumeRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter, helmetMiddleware, sanitizeMiddleware } from './middleware/security.js';

export const app = express();

app.use(helmetMiddleware);
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sanitizeMiddleware);
app.use(apiLimiter);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/admin', adminRouter);

if (env.nodeEnv === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const clientDist = path.resolve(__dirname, '../../client-dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res, next) => {
    if (_req.originalUrl.startsWith('/api')) return next();
    return res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);
