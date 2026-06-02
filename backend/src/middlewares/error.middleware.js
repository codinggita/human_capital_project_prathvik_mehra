// Global error handler catching all unhandled application exceptions
const globalErrorHandler = (err, req, res, next) => {
  // Always log the error for deep debugging during development
  console.error("🔥 ERROR CAUGHT BY MIDDLEWARE:", err);

  let error = { ...err };
  error.message = err.message;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new Error(message);
    error.statusCode = 404;
  }

  // Handle MongoDB Duplicate Key Error (e.g. email already exists)
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(", ")}`;
    error = new Error(message);
    error.statusCode = 400;
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new Error(message);
    error.statusCode = 400;
  }

  // Handle JWT invalid signature
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token signature. Please log in again.";
    error = new Error(message);
    error.statusCode = 401;
  }

  // Handle JWT expiration
  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired. Please log in again.";
    error = new Error(message);
    error.statusCode = 401;
  }

  // Send professional JSON error response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : error,
  });
};

module.exports = { globalErrorHandler };
