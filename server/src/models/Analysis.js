import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true, unique: true, index: true },
    targetRole: { type: String, trim: true, default: '' },
    atsScore: { type: Number, min: 0, max: 100, required: true },
    skills: [{ type: String, trim: true }],
    missingSkills: [{ type: String, trim: true }],
    strengths: [{ type: String, trim: true }],
    weaknesses: [{ type: String, trim: true }],
    recommendations: [{ type: String, trim: true }],
    rolePredictions: [
      {
        role: { type: String, required: true },
        matchPercentage: { type: Number, min: 0, max: 100 },
        explanation: String
      }
    ],
    rawProviderResponse: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Analysis = mongoose.model('Analysis', analysisSchema);
