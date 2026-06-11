import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Server failed to start', error);
  process.exit(1);
});
