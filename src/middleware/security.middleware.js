import rateLimit from 'express-rate-limit';

export const securityConfig = {
    auth: rateLimit({
        windowMs: 15 * 60 * 1000,  // 15min
        max: 5,
        message: { error: 'Too many login attempts' },
    }),

    chat: rateLimit({
        windowMs: 60 * 1000, // 1min
        max: 20,
        message: { error: 'Chat rate limit exceeded' },
    }),
};
