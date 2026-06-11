import { Analysis } from '../models/Analysis.js';
import { Resume } from '../models/Resume.js';
import { analyzeResumeWithAi } from '../services/aiService.js';
import { parsePdf } from '../services/pdfService.js';
import { buildAnalysisPdf } from '../services/reportService.js';
import { AppError } from '../utils/AppError.js';

function ownerFilter(req, extra = {}) {
  return req.user.role === 'admin' ? extra : { ...extra, user: req.user._id };
}

export async function uploadResume(req, res, next) {
  try {
    if (!req.file) throw new AppError('Resume PDF is required', 400);
    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      targetRole: req.body.targetRole || ''
    });

    try {
      resume.parsedText = await parsePdf(req.file.path);
      resume.status = 'parsed';
      await resume.save();
    } catch (error) {
      resume.status = 'failed';
      resume.error = error.message;
      await resume.save();
    }

    res.status(201).json({ success: true, resume });
  } catch (error) {
    next(error);
  }
}

export async function analyzeResume(req, res, next) {
  try {
    const resume = await Resume.findOne(ownerFilter(req, { _id: req.params.id }));
    if (!resume) throw new AppError('Resume not found', 404);
    if (!resume.parsedText) throw new AppError('Resume text could not be parsed', 422);

    const ai = await analyzeResumeWithAi({ resumeText: resume.parsedText, targetRole: resume.targetRole });
    const analysis = await Analysis.findOneAndUpdate(
      { resume: resume._id },
      { ...ai, user: resume.user, resume: resume._id, targetRole: resume.targetRole },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    resume.status = 'analyzed';
    await resume.save();
    res.json({ success: true, analysis });
  } catch (error) {
    next(error);
  }
}

export async function listResumes(req, res, next) {
  try {
    const filter = ownerFilter(req);
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.$text = { $search: req.query.search };
    const resumes = await Resume.find(filter).sort({ createdAt: -1 }).populate('user', 'name email');
    res.json({ success: true, resumes });
  } catch (error) {
    next(error);
  }
}

export async function getResume(req, res, next) {
  try {
    const resume = await Resume.findOne(ownerFilter(req, { _id: req.params.id })).populate('user', 'name email');
    if (!resume) throw new AppError('Resume not found', 404);
    const analysis = await Analysis.findOne({ resume: resume._id });
    res.json({ success: true, resume, analysis });
  } catch (error) {
    next(error);
  }
}

export async function deleteResume(req, res, next) {
  try {
    const resume = await Resume.findOneAndDelete(ownerFilter(req, { _id: req.params.id }));
    if (!resume) throw new AppError('Resume not found', 404);
    await Analysis.deleteOne({ resume: resume._id });
    res.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    next(error);
  }
}

export async function downloadReport(req, res, next) {
  try {
    const resume = await Resume.findOne(ownerFilter(req, { _id: req.params.id }));
    if (!resume) throw new AppError('Resume not found', 404);
    const analysis = await Analysis.findOne({ resume: resume._id });
    if (!analysis) throw new AppError('Analysis not found', 404);
    const pdf = await buildAnalysisPdf({ resume, analysis });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.originalName}-analysis.pdf"`);
    res.send(pdf);
  } catch (error) {
    next(error);
  }
}
