import NodeCache from 'node-cache';
import logger from '../utils/logger.js';
import { callLlm } from '../clients/llm.client.js';

const promptCache = new NodeCache({ stdTTL: 300 }); // 5min

const SYSTEM_PROMPT = `Eres un asistente técnico para desarrolladores fullstack.
Responde claro, conciso y con buenas prácticas. Máximo 200 palabras.`;

export async function handleUserMessage({ message, userId }) {
    const cacheKey = `prompt:${message.toLowerCase().trim()}`;
    const cached = promptCache.get(cacheKey);

    if (cached) {
        logger.info('Cache HIT', { userId, cacheKey });
        return cached;
    }

    const start = Date.now();
    try {
        const result = await callLlm({
            systemPrompt: SYSTEM_PROMPT,
            userMessage: message,
        });

        const response = {
            reply: result.text,
            meta: {
                userId,
                timestamp: new Date().toISOString(),
                usage: result.usage,
                cached: false,
            },
        };

        promptCache.set(cacheKey, response);
        logger.info('Chat success', {
            userId,
            tokens: result.usage?.total_tokens,
            durationMs: Date.now() - start
        });

        return response;
    } catch (error) {
        logger.error('Chat failed', { userId, error: error.message });
        throw error;
    }
}
