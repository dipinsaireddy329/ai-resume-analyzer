import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';

const fallbackSkills = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Communication'];

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function localAnalysis(resumeText, targetRole = '') {
  const lower = resumeText.toLowerCase();
  const skills = fallbackSkills.filter((skill) => lower.includes(skill.toLowerCase()));
  const missingSkills = fallbackSkills.filter((skill) => !skills.includes(skill)).slice(0, 4);
  const atsScore = Math.min(92, Math.max(45, 50 + skills.length * 7 + (resumeText.length > 1500 ? 12 : 0)));

  return {
    atsScore,
    skills: skills.length ? skills : ['Communication', 'Problem Solving'],
    missingSkills,
    strengths: ['Relevant experience is identifiable', 'Resume contains searchable keywords'],
    weaknesses: ['Impact metrics could be clearer', 'Role-specific keywords can be improved'],
    recommendations: [
      'Add measurable outcomes for recent projects',
      'Mirror important keywords from the target job description',
      'Keep bullet points action-oriented and concise'
    ],
    rolePredictions: [
      {
        role: targetRole || 'Full-Stack Developer',
        matchPercentage: atsScore,
        explanation: 'Prediction is based on detected technical skills, project signals, and resume completeness.'
      },
      {
        role: 'Software Engineer',
        matchPercentage: Math.max(35, atsScore - 8),
        explanation: 'General software engineering fit based on programming and delivery indicators.'
      }
    ]
  };
}

export async function analyzeResumeWithAi({ resumeText, targetRole }) {
  if (!env.geminiApiKey) return { ...localAnalysis(resumeText, targetRole), rawProviderResponse: { provider: 'local-fallback' } };

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: env.geminiModel });
  const prompt = `
Analyze this resume for ATS readiness and role fit. Return only valid JSON with:
atsScore number 0-100, skills string[], missingSkills string[], strengths string[],
weaknesses string[], recommendations string[], rolePredictions [{role, matchPercentage, explanation}].
Target role: ${targetRole || 'not specified'}
Resume:
${resumeText.slice(0, 24000)}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = extractJson(text);
    if (!parsed) throw new Error('Gemini response was not JSON');
    return { ...localAnalysis(resumeText, targetRole), ...parsed, rawProviderResponse: { provider: 'gemini', text } };
  } catch (error) {
    return { ...localAnalysis(resumeText, targetRole), rawProviderResponse: { provider: 'local-fallback', error: error.message } };
  }
}
