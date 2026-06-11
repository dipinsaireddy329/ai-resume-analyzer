import { connectDb } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

await connectDb();
let user = await User.findOne({ email: env.adminEmail }).select('+password');
if (!user) {
  user = await User.create({ name: 'Admin', email: env.adminEmail, password: env.adminPassword, role: 'admin' });
} else {
  user.name = user.name || 'Admin';
  user.role = 'admin';
  if (!(await user.comparePassword(env.adminPassword))) user.password = env.adminPassword;
  await user.save();
}
console.log(`Admin ready: ${user.email}`);
process.exit(0);
