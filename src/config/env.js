import 'dotenv/config';

const requiredVars = ['OPENAI_API_KEY', 'JWT_SECRET', 'DEMO_API_KEY'];

requiredVars.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Missing required env var: ${name}`);
    }
});

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3001,
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiApiUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
    llmModel: process.env.LLM_MODEL || 'gpt-4o-mini',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    demoApiKey: process.env.DEMO_API_KEY,
};
