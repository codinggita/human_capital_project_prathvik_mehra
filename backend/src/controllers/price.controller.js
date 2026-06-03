const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const priceService = require("../services/price.service");

// Delegate advanced specific price queries to service layer
const getLatestPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLatestPrices(req.query);
  return successResponse(
    res,
    200,
    "Latest prices fetched successfully",
    data,
    pagination,
  );
});

const getTrendingPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getTrendingPrices(req.query);
  return successResponse(
    res,
    200,
    "Trending prices fetched successfully",
    data,
    pagination,
  );
});

const getRecentPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getRecentPrices(req.query);
  return successResponse(
    res,
    200,
    "Recent prices fetched successfully",
    data,
    pagination,
  );
});

const getRandomPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getRandomPrices(req.query);
  return successResponse(
    res,
    200,
    "Random prices fetched successfully",
    data,
    pagination,
  );
});

const getHighValuePrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getHighValuePrices(req.query);
  return successResponse(
    res,
    200,
    "High value prices fetched successfully",
    data,
    pagination,
  );
});

const getLowValuePrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLowValuePrices(req.query);
  return successResponse(
    res,
    200,
    "Low value prices fetched successfully",
    data,
    pagination,
  );
});

// Delegate parameter-based queries to service layer
const getPricesByCountry = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByCountry(
    req.params.countryCode,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByYear = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByYear(
    req.params.year,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByMonth = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByMonth(
    req.params.month,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByIndicator = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByIndicator(
    req.params.indicator,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByValue = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByValue(
    req.params.value,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByFrequency = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByFrequency(
    req.params.freq,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getPricesByYearRange = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getPricesByYearRange(
    req.params.startYear,
    req.params.endYear,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getCountryPricesByYear = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getCountryPricesByYear(
    req.params.countryCode,
    req.params.year,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getCountryPricesByMonth = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getCountryPricesByMonth(
    req.params.countryCode,
    req.params.month,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getLatestCountryPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLatestCountryPrices(
    req.params.countryCode,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getCountryPriceHistory = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getCountryPriceHistory(
    req.params.countryCode,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getHighestPricesInYear = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getHighestPricesInYear(
    req.params.year,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getLowestPricesInYear = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLowestPricesInYear(
    req.params.year,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getHighestPricesInMonth = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getHighestPricesInMonth(
    req.params.month,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getLowestPricesInMonth = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLowestPricesInMonth(
    req.params.month,
    req.query,
  );
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const getHighestPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getHighestPrices(req.query);
  return successResponse(
    res,
    200,
    "Highest prices fetched successfully",
    data,
    pagination,
  );
});

const getLowestPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getLowestPrices(req.query);
  return successResponse(
    res,
    200,
    "Lowest prices fetched successfully",
    data,
    pagination,
  );
});

// Base RESTful CRUD Operations
const getPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await priceService.getAllPrices(req.query);
  return successResponse(
    res,
    200,
    "Prices fetched successfully",
    data,
    pagination,
  );
});

const createPrice = asyncHandler(async (req, res) => {
  const data = await priceService.createPrice(req.body);
  return successResponse(res, 201, "Price created successfully", data);
});

const getPriceById = asyncHandler(async (req, res) => {
  const data = await priceService.getSinglePrice(req.params.priceId);
  return successResponse(res, 200, "Price fetched successfully", data);
});

const replacePrice = asyncHandler(async (req, res) => {
  const data = await priceService.replacePrice(req.params.priceId, req.body);
  return successResponse(res, 200, "Price replaced successfully", data);
});

const updatePrice = asyncHandler(async (req, res) => {
  const data = await priceService.updatePrice(req.params.priceId, req.body);
  return successResponse(res, 200, "Price updated successfully", data);
});

const deletePrice = asyncHandler(async (req, res) => {
  await priceService.deletePrice(req.params.priceId);
  return successResponse(res, 200, "Price deleted successfully");
});

// Informational Endpoints (HEAD, OPTIONS)
const getPricesHeaders = (req, res) => res.status(200).send();
const getPricesOptions = (req, res) =>
  res.status(200).set("Allow", "GET, POST, HEAD, OPTIONS").send();
const getPriceHeaders = (req, res) => res.status(200).send();
const getPriceOptions = (req, res) =>
  res.status(200).set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS").send();

module.exports = {
  getLatestPrices,
  getTrendingPrices,
  getRecentPrices,
  getRandomPrices,
  getHighValuePrices,
  getLowValuePrices,
  getPricesByCountry,
  getPricesByYear,
  getPricesByMonth,
  getPricesByIndicator,
  getPricesByValue,
  getPricesByFrequency,
  getPricesByYearRange,
  getCountryPricesByYear,
  getCountryPricesByMonth,
  getLatestCountryPrices,
  getCountryPriceHistory,
  getHighestPricesInYear,
  getLowestPricesInYear,
  getHighestPricesInMonth,
  getLowestPricesInMonth,
  getHighestPrices,
  getLowestPrices,
  getPrices,
  createPrice,
  getPriceById,
  replacePrice,
  updatePrice,
  deletePrice,
  getPricesHeaders,
  getPricesOptions,
  getPriceHeaders,
  getPriceOptions,
};
