const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const jwtService = require("../services/jwt.service");

const generateToken = asyncHandler(async (req, res) => {
  const { data, token } = await jwtService.generateToken(req.body);

  // Set HTTP-only cookie for seamless testing without manual header input
  const cookieOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  res.cookie("token", token, cookieOptions);

  return successResponse(
    res,
    201,
    "JWT Token generated successfully and cookie set",
    { user: data, token },
  );
});

const verifyToken = asyncHandler(async (req, res) => {
  // Prioritize Authorization header (Bearer token), then check body
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "No token provided in header or body" });
  }

  const data = await jwtService.verifyToken(token);
  return successResponse(res, 200, "JWT Token verified successfully", data);
});

const refreshToken = asyncHandler(async (req, res) => {
  // Prioritize Authorization header, then check body
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "No refresh token provided" });
  }

  const { token: newToken } = await jwtService.refreshToken(token);
  return successResponse(res, 200, "JWT Token refreshed successfully", {
    token: newToken,
  });
});

const getJwtProfile = asyncHandler(async (req, res) => {
  // Use req.user which was already populated by the protect middleware
  return successResponse(
    res,
    200,
    "JWT Profile accessed successfully",
    req.user,
  );
});

const jwtProfileOptions = (req, res) =>
  res.status(200).set("Allow", "GET, OPTIONS").send();

const getJwtDashboard = asyncHandler(async (req, res) => {
  const data = await jwtService.getDashboardData(req.user.id);
  return successResponse(res, 200, "JWT Dashboard accessed successfully", data);
});

const getJwtAdmin = asyncHandler(async (req, res) => {
  const data = await jwtService.getAdminData(req.user.id);
  return successResponse(
    res,
    200,
    "JWT Admin route accessed successfully",
    data,
  );
});

const getJwtUser = asyncHandler(async (req, res) => {
  const data = await jwtService.getUserData(req.user.id);
  return successResponse(
    res,
    200,
    "JWT User route accessed successfully",
    data,
  );
});

const verifyAdminRole = asyncHandler(async (req, res) => {
  const data = await jwtService.verifyAdminRole(req.user.id);
  return successResponse(res, 200, "Admin role verified successfully", data);
});

const verifyUserRole = asyncHandler(async (req, res) => {
  const data = await jwtService.verifyUserRole(req.user.id);
  return successResponse(res, 200, "User role verified successfully", data);
});

module.exports = {
  generateToken,
  verifyToken,
  refreshToken,
  getJwtProfile,
  jwtProfileOptions,
  getJwtDashboard,
  getJwtAdmin,
  getJwtUser,
  verifyAdminRole,
  verifyUserRole,
};
