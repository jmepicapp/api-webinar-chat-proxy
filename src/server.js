import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, () => {
    console.log(`🚀 API running on http://localhost:${env.port} (${env.nodeEnv})`);
    console.log(`📊 Swagger: http://localhost:${env.port}/api-docs (${env.nodeEnv})`);
});
