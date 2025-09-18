import { env } from './config/env';
import { createApp } from './app';

const app = createApp();

app.listen(env.port, () => {
  console.log(`Nodipar backend listening on port ${env.port}`);
});
