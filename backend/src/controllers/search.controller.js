const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const searchService = require("../services/search.service");

// Call service layer for full-text search matching
const searchPrices = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchPrices(req.query);
  return successResponse(
    res,
    200,
    "Search results fetched successfully",
    data,
    pagination,
  );
});

const searchPricesOptions = (req, res) =>
  res.status(200).set("Allow", "GET, OPTIONS").send();

const searchByCountry = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchCountry(req.query);
  return successResponse(
    res,
    200,
    "Country search results fetched successfully",
    data,
    pagination,
  );
});

const searchByIndicator = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchIndicator(req.query);
  return successResponse(
    res,
    200,
    "Indicator search results fetched successfully",
    data,
    pagination,
  );
});

const searchByValue = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchValue(req.query);
  return successResponse(
    res,
    200,
    "Value search results fetched successfully",
    data,
    pagination,
  );
});

const searchByYear = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchYear(req.query);
  return successResponse(
    res,
    200,
    "Year search results fetched successfully",
    data,
    pagination,
  );
});

const searchByMonth = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchMonth(req.query);
  return successResponse(
    res,
    200,
    "Month search results fetched successfully",
    data,
    pagination,
  );
});

const searchByFrequency = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.searchFrequency(req.query);
  return successResponse(
    res,
    200,
    "Frequency search results fetched successfully",
    data,
    pagination,
  );
});

const advancedCombinedSearch = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.advancedSearch(req.query);
  return successResponse(
    res,
    200,
    "Advanced combined search results fetched successfully",
    data,
    pagination,
  );
});

const globalSearch = asyncHandler(async (req, res) => {
  const { data, pagination } = await searchService.globalSearch(req.query);
  return successResponse(
    res,
    200,
    "Global search results fetched successfully",
    data,
    pagination,
  );
});

module.exports = {
  searchPrices,
  searchPricesOptions,
  searchByCountry,
  searchByIndicator,
  searchByValue,
  searchByYear,
  searchByMonth,
  searchByFrequency,
  advancedCombinedSearch,
  globalSearch,
};
