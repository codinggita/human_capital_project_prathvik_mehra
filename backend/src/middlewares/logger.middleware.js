const morgan = require("morgan");

// Optional: Generate custom Morgan token for request body if needed (avoid logging passwords)
morgan.token("safe-body", (req) => {
  const body = { ...req.body };
  if (body.password) delete body.password; // Ensure passwords never hit the logs
  return JSON.stringify(body);
});

// Create a professional request logger format
// Logs HTTP method, endpoint URL, status code, response length, and execution time
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
);

module.exports = { requestLogger };
