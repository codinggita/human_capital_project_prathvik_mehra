const jwt = require("jsonwebtoken");

// Generate short-lived access token
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Generate long-lived refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// Verify any JWT securely checking its signature
const verifyToken = (token, isRefresh = false) => {
  const secret = isRefresh
    ? process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    : process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

// Decode token without verifying signature (useful for client hints)
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
};
