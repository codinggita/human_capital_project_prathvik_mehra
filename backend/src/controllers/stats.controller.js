const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const statsService = require("../services/stats.service");

const getOverviewStats = asyncHandler(async (req, res) => {
  const data = await statsService.getOverviewStats();
  return successResponse(
    res,
    200,
    "Overview statistics fetched successfully",
    data,
  );
});

const getPriceStats = asyncHandler(async (req, res) => {
  const data = await statsService.getPriceStatistics();
  return successResponse(
    res,
    200,
    "Price statistics fetched successfully",
    data,
  );
});

const getPriceStatsHeaders = (req, res) =>
  res.status(200).set("Allow", "GET, HEAD").send();

const getHighestValue = asyncHandler(async (req, res) => {
  const data = await statsService.getHighestValue();
  return successResponse(res, 200, "Highest value fetched successfully", data);
});

const getLowestValue = asyncHandler(async (req, res) => {
  const data = await statsService.getLowestValue();
  return successResponse(res, 200, "Lowest value fetched successfully", data);
});

const getMonthlyAverage = asyncHandler(async (req, res) => {
  const data = await statsService.getMonthlyAverage();
  return successResponse(
    res,
    200,
    "Monthly average fetched successfully",
    data,
  );
});

const getYearlyAverage = asyncHandler(async (req, res) => {
  const data = await statsService.getYearlyAverage();
  return successResponse(res, 200, "Yearly average fetched successfully", data);
});

const getTopCountries = asyncHandler(async (req, res) => {
  const data = await statsService.getTopCountries();
  return successResponse(res, 200, "Top countries fetched successfully", data);
});

const getTopIndicators = asyncHandler(async (req, res) => {
  const data = await statsService.getTopIndicators();
  return successResponse(res, 200, "Top indicators fetched successfully", data);
});

const getValueDistribution = asyncHandler(async (req, res) => {
  const data = await statsService.getValueDistribution();
  return successResponse(
    res,
    200,
    "Value distribution fetched successfully",
    data,
  );
});

const getFrequencyDistribution = asyncHandler(async (req, res) => {
  const data = await statsService.getFrequencyDistribution();
  return successResponse(
    res,
    200,
    "Frequency distribution fetched successfully",
    data,
  );
});

const getRecordsCount = asyncHandler(async (req, res) => {
  const data = await statsService.getRecordsCount();
  return successResponse(res, 200, "Records count fetched successfully", data);
});

const getTrendingStats = asyncHandler(async (req, res) => {
  const data = await statsService.getTrendingStatistics();
  return successResponse(
    res,
    200,
    "Trending statistics fetched successfully",
    data,
  );
});

const getCountryStats = asyncHandler(async (req, res) => {
  const data = await statsService.getCountryStats(req.params.countryCode);
  return successResponse(
    res,
    200,
    "Country statistics fetched successfully",
    data,
  );
});

const getYearStats = asyncHandler(async (req, res) => {
  const data = await statsService.getYearStats(req.params.year);
  return successResponse(
    res,
    200,
    "Year statistics fetched successfully",
    data,
  );
});

const getMonthStats = asyncHandler(async (req, res) => {
  const data = await statsService.getMonthStats(req.params.month);
  return successResponse(
    res,
    200,
    "Month statistics fetched successfully",
    data,
  );
});

module.exports = {
  getOverviewStats,
  getPriceStats,
  getPriceStatsHeaders,
  getHighestValue,
  getLowestValue,
  getMonthlyAverage,
  getYearlyAverage,
  getTopCountries,
  getTopIndicators,
  getValueDistribution,
  getFrequencyDistribution,
  getRecordsCount,
  getTrendingStats,
  getCountryStats,
  getYearStats,
  getMonthStats,
};
