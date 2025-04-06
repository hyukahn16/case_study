// const winston = require('winston');
import winston from 'winston';

// Configure Winston logger
export const logger = winston.createLogger({
  level: 'info', // Specify the logging level here (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // logs everything to console
    new winston.transports.Console(),
    // logs errors to error-specific file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Logs all levels to general file
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

export default logger;