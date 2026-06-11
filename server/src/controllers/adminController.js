import { Analysis } from '../models/Analysis.js';
import { Resume } from '../models/Resume.js';
import { User } from '../models/User.js';

export async function stats(_req, res, next) {
  try {
    const [users, resumes, analyses, admins] = await Promise.all([
      User.countDocuments(),
      Resume.countDocuments(),
      Analysis.countDocuments(),
      User.countDocuments({ role: 'admin' })
    ]);
    res.json({ success: true, stats: { users, resumes, analyses, admins } });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(_req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}
