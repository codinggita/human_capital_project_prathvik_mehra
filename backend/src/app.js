const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const hpp = require("hpp");
const cookieParser = require("cookie-parser");

// Import Custom Middlewares & Utilities
const { globalErrorHandler } = require("./middlewares/error.middleware");
const { notFoundHandler } = require("./middlewares/notFound.middleware");
const { requestLogger } = require("./middlewares/logger.middleware");
const { apiLimiter } = require("./middlewares/rateLimit.middleware");
const { sanitizeQuery } = require("./utils/sanitizeData");

// Import API Routes
const authRoutes = require("./routes/auth.routes");
const priceRoutes = require("./routes/price.routes");
const countryRoutes = require("./routes/country.routes");
const indicatorRoutes = require("./routes/indicator.routes");
const searchRoutes = require("./routes/search.routes");
const statsRoutes = require("./routes/stats.routes");
const adminRoutes = require("./routes/admin.routes");
const jwtRoutes = require("./routes/jwt.routes");
const compareRoutes = require("./routes/compare.routes");
const healthRoutes = require("./routes/health.routes");
const protectedRoutes = require("./routes/protected.routes");
const monthRoutes = require("./routes/month.routes");
const yearRoutes = require("./routes/year.routes");
const reportRoutes = require("./routes/report.routes");
const importRoutes = require("./routes/import.routes");

// Initialize Express Application
const app = express();

// ==========================================
// 🛡️ GLOBAL SECURITY & MIDDLEWARES
// ==========================================

// Set secure HTTP headers globally
app.use(helmet());

// Enable Cross-Origin Resource Sharing for frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Body parsers: read data from req.body (with strict size limits)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization handled by custom sanitizeQuery middleware below

// Data sanitization against XSS is handled by Zod validators and frontend React escaping

// Prevent HTTP Parameter Pollution (e.g. ?sort=value&sort=year)
app.use(hpp());

// Custom recursive string trimming and NoSQL sanitization
app.use(sanitizeQuery);

// Compress outgoing response bodies to optimize network speeds
app.use(compression());

// Professional request logger (Morgan wrapped)
app.use(requestLogger);

// Global API Rate Limiter to prevent massive spam attacks
app.use("/api", apiLimiter);

// ==========================================
// ❤️ ROOT & SYSTEM ENDPOINTS
// ==========================================

// Basic API welcome endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Human Capital Analytics API",
    version: "1.0.0",
    documentation: "/api/v1/health",
  });
});

// ==========================================
// 📂 API ROUTE INTEGRATION (v1)
// ==========================================

const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/prices`, priceRoutes);
app.use(`${API_PREFIX}/countries`, countryRoutes);
app.use(`${API_PREFIX}/indicators`, indicatorRoutes);
app.use(`${API_PREFIX}/search`, searchRoutes);
app.use(`${API_PREFIX}/stats`, statsRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);
app.use(`${API_PREFIX}/jwt`, jwtRoutes);
app.use(`${API_PREFIX}/compare`, compareRoutes);
app.use(`${API_PREFIX}/health`, healthRoutes);
app.use(`${API_PREFIX}/protected`, protectedRoutes);
app.use(`${API_PREFIX}/months`, monthRoutes);
app.use(`${API_PREFIX}/years`, yearRoutes);
app.use(`${API_PREFIX}/reports`, reportRoutes);
app.use(`${API_PREFIX}/import`, importRoutes);

// ==========================================
// ❌ GLOBAL ERROR HANDLING
// ==========================================

// Handle undefined routes returning a professional 404 response
app.use(notFoundHandler);

// Global Error Handler capturing and formatting all thrown application errors
app.use(globalErrorHandler);

// Export fully configured app
module.exports = app;
