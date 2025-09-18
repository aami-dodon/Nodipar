import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './db/client.js';

async function bootstrap() {
  try {
    await connectDatabase();
    const app = createApp();
    app.listen(env.PORT, () => {
      console.log(`API server ready at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

void bootstrap();
