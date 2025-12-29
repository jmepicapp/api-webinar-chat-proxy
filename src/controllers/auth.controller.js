import { generateToken } from '../services/auth.service.js';
import { env } from '../config/env.js';

export function login(req, res) {
    const appName =  'webinar-chat-llm-proxy';

    const payload = {
        sub: appName,
        app: appName,
        permissions: ['chat:write'],
    };

    const token = generateToken(payload);

    res.json({
        success: true,
        token,
        expiresIn: env.jwtExpiresIn,
    });
}
