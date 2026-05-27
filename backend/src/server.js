const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

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

// 7. Base API Root Versioning Endpoint
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Economic Analytics REST API v1. Ready for analytical operations.'
  });
});

module.exports = app;
