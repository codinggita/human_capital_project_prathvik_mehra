const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { errorResponse } = require("../utils/responseFormatter");
const User = require("../models/user.model");

// Extract bearer token and verify JWT signature
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Fallback to token in cookies if header is missing
  else if (req.cookies && (req.cookies.token || req.cookies.jwt)) {
    token = req.cookies.token || req.cookies.jwt;
  }

  if (!token) {
    return errorResponse(
      res,
      401,
      "Authentication failed: No token provided in header or cookies",
    );
  }

  try {
    // Verify token expiration and signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request object, excluding password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return errorResponse(
        res,
        401,
        "User belonging to this token no longer exists",
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, 401, "Not authorized, invalid or expired token");
  }
});

// Alias for standard protect middleware
const authenticateUser = protect;

// Standalone verification utility without database user lookup
const verifyJWT = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.cookies?.token ||
    req.cookies?.jwt;

  if (!token) {
    return errorResponse(
      res,
      401,
      "Authentication failed: No token provided in header or cookies",
    );
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return errorResponse(res, 401, "Invalid or expired token");
  }
};

module.exports = { protect, authenticateUser, verifyJWT };
