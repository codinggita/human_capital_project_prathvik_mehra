// Recursively remove dangerous NoSQL injection keys (e.g. starting with $)
const sanitizeInput = (data) => {
  if (typeof data !== "object" || data === null) {
    // Trim string inputs dynamically to prevent whitespace exploitation
    return typeof data === "string" ? data.trim() : data;
  }

  const sanitized = Array.isArray(data) ? [] : {};
  for (const key in data) {
    if (key.startsWith("$")) continue; // Strip NoSQL injection payload completely
    sanitized[key] = sanitizeInput(data[key]);
  }
  return sanitized;
};

// Express Middleware-ready wrapper for rapidly sanitizing queries
const sanitizeQuery = (req, res, next) => {
  if (req.query) {
    const sanitizedQuery = sanitizeInput(req.query);
    for (const key in req.query) delete req.query[key];
    Object.assign(req.query, sanitizedQuery);
  }

  if (req.body) {
    const sanitizedBody = sanitizeInput(req.body);
    for (const key in req.body) delete req.body[key];
    Object.assign(req.body, sanitizedBody);
  }

  next();
};

module.exports = { sanitizeInput, sanitizeQuery };
