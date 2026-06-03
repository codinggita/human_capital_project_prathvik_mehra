const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const countryService = require("../services/country.service");

const getCountries = asyncHandler(async (req, res) => {
  const { data, pagination } = await countryService.getAllCountries(req.query);
  return successResponse(
    res,
    200,
    "Countries fetched successfully",
    data,
    pagination,
  );
});

const createCountry = asyncHandler(async (req, res) => {
  const data = await countryService.createCountry(req.body);
  return successResponse(res, 201, "Country created successfully", data);
});

const getCountryById = asyncHandler(async (req, res) => {
  const data = await countryService.getCountryById(req.params.id);
  return successResponse(res, 200, "Country fetched successfully", data);
});

const updateCountry = asyncHandler(async (req, res) => {
  const data = await countryService.updateCountry(req.params.id, req.body);
  return successResponse(res, 200, "Country updated successfully", data);
});

const deleteCountry = asyncHandler(async (req, res) => {
  await countryService.deleteCountry(req.params.id);
  return successResponse(res, 200, "Country deleted successfully");
});

const getTopCountries = asyncHandler(async (req, res) => {
  const { data, pagination } = await countryService.getTopCountries(req.query);
  return successResponse(
    res,
    200,
    "Top countries fetched successfully",
    data,
    pagination,
  );
});

const getCountryMetrics = asyncHandler(async (req, res) => {
  const data = await countryService.getCountryMetrics(req.params.countryCode);
  return successResponse(
    res,
    200,
    "Country metrics fetched successfully",
    data,
  );
});

module.exports = {
  getCountries,
  createCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
  getTopCountries,
  getCountryMetrics,
};
