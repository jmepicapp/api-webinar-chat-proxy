import { Router } from 'express';
import { postChat } from '../controllers/chat.controller.js';
import { jwtAuth } from '../middleware/auth.middleware.js';
import { chatRateLimiter } from '../middleware/rate-limit.middleware.js';

export const chatRouter = Router();
chatRouter.post('/', jwtAuth, chatRateLimiter, postChat);
