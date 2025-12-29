import Joi from 'joi';

export const chatMessageSchema = Joi.object({
    message: Joi.string().min(1).max(1000).required().label('Message'),
    userId: Joi.string().max(50).optional().label('User ID'),
}).max(2);
