const { errorResponse } = require("../utils/responseFormatter");

// Restrict access based on allowed roles array
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if current user's role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `User role '${req.user.role}' is not authorized to access this route`,
      );
    }
    next();
  };
};

// Quick helper for Admin-only routes
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return errorResponse(res, 403, "Access denied. Admin privileges required.");
  }
};

// Quick helper for standard User-only routes
const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return errorResponse(
      res,
      403,
      "Access denied. Standard user privileges required.",
    );
  }
};

module.exports = { authorizeRoles, isAdmin, isUser };
