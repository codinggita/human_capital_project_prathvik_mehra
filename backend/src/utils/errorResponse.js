// Custom Error Class to safely carry HTTP status codes to the global error middleware
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace properly for debugging outside of production
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
