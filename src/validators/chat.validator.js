import Joi from 'joi';

export const chatMessageSchema = Joi.object({
    message: Joi.string().min(1).max(1000).required().label('Message')
}).max(2);
