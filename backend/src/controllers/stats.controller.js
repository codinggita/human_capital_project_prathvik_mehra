const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const statsService = require("../services/stats.service");

const getGlobalAverage = asyncHandler(async (req, res) => {
    const { indicator, year } = req.query;

    if (!indicator) {
        throw new ApiError(400, "Indicator code is required for average calculation");
    }

    const data = await statsService.getGlobalAverage(indicator, year);

    if (!data) {
        throw new ApiError(404, "Data not found for the given indicator");
    }

    return res.status(200).json(
        new ApiResponse(200, data, "Global average calculated successfully")
    );
});

const getTopPerformers = asyncHandler(async (req, res) => {
    const { indicator, year, limit = 10, order = 'desc' } = req.query;

    if (!indicator) {
        throw new ApiError(400, "Indicator code is required");
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const data = await statsService.getTopCountries(indicator, year, limit, sortOrder);

    if (!data) {
        throw new ApiError(404, "Data not found for the given parameters");
    }

    return res.status(200).json(
        new ApiResponse(200, data, "Top performers retrieved successfully")
    );
});

const getCountryComparison = asyncHandler(async (req, res) => {
    const { country1, country2, indicator } = req.query;

    if (!country1 || !country2 || !indicator) {
        throw new ApiError(400, "country1, country2, and indicator codes are required");
    }

    const data = await statsService.compareCountries(country1, country2, indicator);

    if (!data) {
        throw new ApiError(404, "Comparison data not found");
    }

    return res.status(200).json(
        new ApiResponse(200, data, "Country comparison retrieved successfully")
    );
});

module.exports = {
    getGlobalAverage,
    getTopPerformers,
    getCountryComparison
};
