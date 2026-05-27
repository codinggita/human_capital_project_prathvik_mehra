const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // Default to 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100, // Max requests per window per IP
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = limiter;
