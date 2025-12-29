import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { apiKeyAuth } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rate-limit.middleware.js';

export const authRouter = Router();
authRouter.post('/login', apiKeyAuth, authRateLimiter, login);
