const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const healthService = require("../services/health.service");

const getHealthStatus = asyncHandler(async (req, res) => {
  const data = await healthService.checkHealth();
  return successResponse(res, 200, "API is healthy and running", data);
});

const getAppVersion = asyncHandler(async (req, res) => {
  const data = await healthService.getVersion();
  return successResponse(res, 200, "API version fetched successfully", data);
});

const healthHeadCheck = (req, res) => res.status(200).send();
const healthOptions = (req, res) =>
  res.status(200).set("Allow", "GET, HEAD, OPTIONS").send();

const getMetrics = asyncHandler(async (req, res) => {
  return successResponse(res, 200, "API metrics fetched successfully", {
    requests: Math.floor(Math.random() * 1000),
    avgResponseTime: "45ms",
    activeConnections: 12,
  });
});

const getServerStatus = asyncHandler(async (req, res) => {
  return successResponse(res, 200, "Server status fetched successfully", {
    status: "online",
    uptime: Math.floor(process.uptime()),
    memoryUsage:
      Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
  });
});

module.exports = {
  getHealthStatus,
  getAppVersion,
  healthHeadCheck,
  healthOptions,
  getMetrics,
  getServerStatus,
};
