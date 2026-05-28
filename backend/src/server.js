// NOTE: dotenv is loaded once in app.js before this module is required.
// Do NOT call dotenv.config() here again to avoid double-loading env vars.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const corsOptions = require('./config/corsOptions');
const rateLimiter = require('./config/rateLimiter');

const app = express();

// 1. HTTP Security Headers
app.use(helmet());

// 2. Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// 3. Logger Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.LOG_LEVEL || 'dev'));
}

// 4. Request Payload Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. API Rate Limiting
app.use(rateLimiter);

// 6. Base Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy and online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { ApiError } = require('./utils/ApiError');

// 7. Base API Root Versioning Endpoint
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Economic Analytics REST API v1. Ready for analytical operations.'
  });
});

// 8. Mount Application Routes
app.use('/api/v1', apiRoutes);

// 9. Catch-all for undefined routes
app.use('*', (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// 10. Global Error Handler
app.use(errorHandler);

module.exports = app;
