import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './docs/swagger.js';
import { loggingMiddleware } from './middleware/logging.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { authRouter } from './routes/auth.routes.js';
import { chatRouter } from './routes/chat.routes.js';

export function createApp() {
    const app = express();

    // Swagger
    const specs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
        customCssUrl: '/swagger-custom.css'
    }));

    // Middleware
    app.use(cors());
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(loggingMiddleware);

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Routes
    app.use('/api/auth', authRouter);
    app.use('/api/chat', chatRouter);

    // 404 & Error handlers
    app.use((req, res) => res.status(404).json({ error: 'Not found' }));
    app.use(errorMiddleware);

    return app;
}
