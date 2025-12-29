import { handleUserMessage } from '../services/chat.service.js';
import { chatMessageSchema } from '../validators/chat.validator.js';

export async function postChat(req, res, next) {
    try {
        const { error } = chatMessageSchema.validate(req.body);
        if (error) {
            const err = new Error(error.details[0].message);
            err.statusCode = 400;
            throw err;
        }

        const result = await handleUserMessage({
            message: req.body.message,
            userId: req.user?.sub || req.body.userId,
        });

        res.json({
            success: true,
            message: result.reply,
            meta: result.meta,
        });
    } catch (error) {
        next(error);
    }
}
