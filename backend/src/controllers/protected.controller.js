const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const protectedService = require("../services/protected.service");

const getProtectedData = asyncHandler(async (req, res) => {
  const data = await protectedService.getProtectedData(req.user.id);
  return successResponse(
    res,
    200,
    "Protected data accessed successfully",
    data,
  );
});

const getUserActivityLogs = asyncHandler(async (req, res) => {
  const { data, pagination } = await protectedService.getUserActivityLogs(
    req.user.id,
    req.query,
  );
  return successResponse(
    res,
    200,
    "User activity logs fetched successfully",
    data,
    pagination,
  );
});

module.exports = {
  getProtectedData,
  getUserActivityLogs,
};
