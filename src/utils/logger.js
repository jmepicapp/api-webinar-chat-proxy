import winston from 'winston';
import { env } from '../config/env.js';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
];

if (env.nodeEnv !== 'development') {
    transports.push(new winston.transports.File({ filename: 'logs/app.log' }));
}

export default winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports,
});
