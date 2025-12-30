import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, () => {
    if (env.nodeEnv === 'development') {
        console.log(`🚀 API running on http://localhost:${env.port} (${env.nodeEnv} environment)`);
        console.log(`📊 Swagger: http://localhost:${env.port}/api-docs (${env.nodeEnv} environment)`);
    } else {
        console.log(`🚀 API running. (${env.nodeEnv} environment)`);
        console.log(`📊 Swagger in path /api-docs (${env.nodeEnv} environment)`);
    }

});
