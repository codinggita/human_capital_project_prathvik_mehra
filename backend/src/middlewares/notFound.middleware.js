// Catch-all handler for invalid routes that do not match our router
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found - Cannot ${req.method} ${req.originalUrl}`,
    error: {},
  });
};

module.exports = { notFoundHandler };
