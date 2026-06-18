const rateLimit = require("express-rate-limit");

// General API rate limiting to prevent spam and DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5000, // Limit each IP to 5000 requests per window
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiting for authentication routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 500, // Limit each IP to 500 auth requests per hour
  message: {
    success: false,
    message: "Too many login attempts, please try again after an hour",
  },
});

// Admin specific rate limiter to protect heavy operations
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Stricter limit for heavy admin operations
  message: {
    success: false,
    message: "Admin request limit exceeded, please try again later",
  },
});

// Search specific rate limiter
const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { success: false, message: "Too many searches, please slow down" },
});

// Bulk import rate limiter
const importLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Bulk import limit reached, try again in an hour",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  adminLimiter,
  searchLimiter,
  importLimiter,
};
