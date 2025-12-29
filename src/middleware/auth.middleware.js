import { verifyToken } from '../services/auth.service.js';
import { env } from '../config/env.js';

export function apiKeyAuth(req, res, next) {
    const apiKey = req.header('demo-api-key');
    if (apiKey !== env.demoApiKey) {
        const error = new Error(env.nodeEnv === 'development' ?
            'Invalid API key' : 'Unauthorized');
        error.statusCode = 401;
        throw error;
    }
    next();
}

export function jwtAuth(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        const error = new Error('Missing Bearer token');
        error.statusCode = 401;
        throw error;
    }

    try {
        const token = authHeader.substring(7);
        req.user = verifyToken(token);
        next();
    } catch {
        const error = new Error('Invalid or expired token');
        error.statusCode = 401;
        throw error;
    }
}
