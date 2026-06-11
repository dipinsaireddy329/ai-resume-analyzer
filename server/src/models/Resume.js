import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalName: { type: String, required: true },
    storedName: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    parsedText: { type: String, default: '' },
    targetRole: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['uploaded', 'parsed', 'analyzed', 'failed'], default: 'uploaded', index: true },
    error: String
  },
  { timestamps: true }
);

resumeSchema.index({ originalName: 'text', targetRole: 'text', parsedText: 'text' });

export const Resume = mongoose.model('Resume', resumeSchema);
