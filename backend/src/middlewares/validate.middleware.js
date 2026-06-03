const { errorResponse } = require("../utils/responseFormatter");

// Generic request validator supporting Zod or Joi schemas
const validateRequest = (schema) => {
  return async (req, res, next) => {
    // If no schema is passed (useful when scaffolding before writing real schemas), move to next
    if (!schema) return next();

    try {
      // Validate body, query, and params against the provided schema configuration
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Extract clean validation errors to send to client
      if (error.name === "ZodError" || error.issues) {
        const issues = error.issues || error.errors || [];
        const errorMessages = issues
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        return errorResponse(res, 400, `Validation Failed: ${errorMessages}`);
      }
      return errorResponse(
        res,
        400,
        error.message || "Invalid request payload",
      );
    }
  };
};

module.exports = { validateRequest };
