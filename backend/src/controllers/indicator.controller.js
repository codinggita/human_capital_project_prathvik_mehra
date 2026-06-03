const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const indicatorService = require("../services/indicator.service");

const getIndicators = asyncHandler(async (req, res) => {
  const { data, pagination } = await indicatorService.getAllIndicators(
    req.query,
  );
  return successResponse(
    res,
    200,
    "Indicators fetched successfully",
    data,
    pagination,
  );
});

const createIndicator = asyncHandler(async (req, res) => {
  const data = await indicatorService.createIndicator(req.body);
  return successResponse(res, 201, "Indicator created successfully", data);
});

const getIndicatorById = asyncHandler(async (req, res) => {
  const data = await indicatorService.getIndicatorById(req.params.id);
  return successResponse(res, 200, "Indicator fetched successfully", data);
});

const updateIndicator = asyncHandler(async (req, res) => {
  const data = await indicatorService.updateIndicator(req.params.id, req.body);
  return successResponse(res, 200, "Indicator updated successfully", data);
});

const deleteIndicator = asyncHandler(async (req, res) => {
  await indicatorService.deleteIndicator(req.params.id);
  return successResponse(res, 200, "Indicator deleted successfully");
});

const getIndicatorSummary = asyncHandler(async (req, res) => {
  const data = await indicatorService.getIndicatorSummary(req.query);
  return successResponse(
    res,
    200,
    "Indicator summary fetched successfully",
    data,
  );
});

module.exports = {
  getIndicators,
  createIndicator,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,
  getIndicatorSummary,
};
