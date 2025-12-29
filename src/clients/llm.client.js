import axios from 'axios';
import { env } from '../config/env.js';

export async function callLlm({ systemPrompt, userMessage }) {
    try {
        const response = await axios.post(
            env.openAiApiUrl,
            {
                model: env.llmModel,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage },
                ],
                max_tokens: 300,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${env.openAiApiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 15000,
            }
        );

        return {
            text: response.data.choices[0].message.content.trim(),
            usage: response.data.usage,
        };
    } catch (error) {
        const err = new Error('LLM service unavailable');
        err.statusCode = 502;
        throw err;
    }
}
