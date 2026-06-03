const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const authService = require("../services/auth.service");

// Call service layer for user registration
const register = asyncHandler(async (req, res) => {
  const { data, token } = await authService.registerUser(req.body);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  return successResponse(res, 201, "User registered successfully", {
    user: data,
    token,
  });
});

// Call service layer for user login
const login = asyncHandler(async (req, res) => {
  const { data, token } = await authService.loginUser(req.body);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  return successResponse(res, 200, "User logged in successfully", {
    user: data,
    token,
  });
});

// Provide allowed OPTIONS for login endpoint
const loginOptions = (req, res) =>
  res.status(200).set("Allow", "POST, OPTIONS").send();

// Call service layer to handle logout revocation
const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.id);
  return successResponse(res, 200, "User logged out successfully");
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return successResponse(res, 200, "Password reset token sent to email");
});

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  return successResponse(res, 200, "Password reset successfully");
});

const refreshToken = asyncHandler(async (req, res) => {
  const { token } = await authService.refreshToken(req.body.refreshToken);
  return successResponse(res, 200, "Token refreshed successfully", { token });
});

const getMe = asyncHandler(async (req, res) => {
  const data = await authService.getCurrentUser(req.user.id);
  return successResponse(res, 200, "User profile fetched successfully", data);
});

// Provide HEAD response for profile checks
const checkMeHeaders = (req, res) =>
  res.status(200).set("Allow", "GET, HEAD").send();

const sendOtp = asyncHandler(async (req, res) => {
  await authService.sendOTP(req.body.email);
  return successResponse(res, 200, "OTP sent successfully");
});

const verifyOtp = asyncHandler(async (req, res) => {
  await authService.verifyOTP(req.body.email, req.body.otp);
  return successResponse(res, 200, "OTP verified successfully");
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(
    req.user.id,
    req.body.oldPassword,
    req.body.newPassword,
  );
  return successResponse(res, 200, "Password changed successfully");
});

module.exports = {
  register,
  login,
  loginOptions,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
  getMe,
  checkMeHeaders,
  sendOtp,
  verifyOtp,
  changePassword,
};
