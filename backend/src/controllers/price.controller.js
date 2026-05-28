const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const priceService = require("../services/price.service");
const { getPaginationOptions, getPaginatedPayload } = require("../utils/pagination");
const { DataPoint } = require("../models/dataPoint.model");
const { Country } = require("../models/country.model");

// ==========================
// Core Query & CRUD Logic
// ==========================
const getPrices = asyncHandler(async (req, res) => {
    const filter = priceService.buildFilter(req.query);
    const paginationOptions = getPaginationOptions(req);
    const { data, totalDocs } = await priceService.getPrices(filter, paginationOptions);
    const payload = getPaginatedPayload(data, paginationOptions.page, paginationOptions.limit, totalDocs);
    return res.status(200).json(new ApiResponse(200, payload, "Prices retrieved successfully"));
});

const getPriceById = asyncHandler(async (req, res) => {
    const { priceId } = req.params;
    const price = await DataPoint.findById(priceId);
    if (!price) throw new ApiError(404, "Price not found");
    return res.status(200).json(new ApiResponse(200, price, "Price retrieved successfully"));
});

const createPrice = asyncHandler(async (req, res) => {
    const price = await DataPoint.create(req.body);
    return res.status(201).json(new ApiResponse(201, price, "Price created successfully"));
});

const updatePrice = asyncHandler(async (req, res) => {
    const { priceId } = req.params;
    const price = await DataPoint.findByIdAndUpdate(priceId, req.body, { new: true, runValidators: true });
    if (!price) throw new ApiError(404, "Price not found");
    return res.status(200).json(new ApiResponse(200, price, "Price updated successfully"));
});

const deletePrice = asyncHandler(async (req, res) => {
    const { priceId } = req.params;
    const price = await DataPoint.findByIdAndDelete(priceId);
    if (!price) throw new ApiError(404, "Price not found");
    return res.status(200).json(new ApiResponse(200, price, "Price deleted successfully"));
});

// ==========================
// Exact Path Parameter Wrappers
// ==========================
const wrapQuery = (paramMap) => asyncHandler(async (req, res, next) => {
    for (const [param, queryKey] of Object.entries(paramMap)) {
        if (req.params[param]) req.query[queryKey] = req.params[param];
    }
    return getPrices(req, res, next);
});

// Using wrapQuery where no DB lookups are needed
const getPricesByYear = wrapQuery({ year: 'year' });
const getPricesByMonth = wrapQuery({ month: 'month' });
const getPricesByIndicator = wrapQuery({ indicator: 'indicator' });
const getPricesByFrequency = wrapQuery({ freq: 'frequency' });
const getPricesByRange = wrapQuery({ startYear: 'startYear', endYear: 'endYear' });

const getPricesByValue = asyncHandler(async (req, res) => {
    req.query.minValue = req.params.value;
    req.query.maxValue = req.params.value;
    return getPrices(req, res);
});

// Country wrappers require DB lookup to map Code to ObjectId
const withCountry = (handler) => asyncHandler(async (req, res, next) => {
    const { countryCode } = req.params;
    if (countryCode) {
        const country = await Country.findById(countryCode.toUpperCase());
        if (!country) throw new ApiError(404, `Country '${countryCode}' not found`);
        req.query.country = country._id;
    }
    return handler(req, res, next);
});

const getPricesByCountry = withCountry(getPrices);
const getPricesByCountryYear = withCountry(wrapQuery({ year: 'year' }));
const getPricesByCountryMonth = withCountry(wrapQuery({ month: 'month' }));

const getPricesByCountryLatest = withCountry(asyncHandler(async (req, res) => {
    req.query.limit = 1;
    req.query.sortBy = 'year';
    req.query.sortOrder = 'desc';
    return getPrices(req, res);
}));

const getPricesByCountryHistory = withCountry(asyncHandler(async (req, res) => {
    req.query.sortBy = 'year';
    req.query.sortOrder = 'asc';
    return getPrices(req, res);
}));

// Highest/Lowest logic
const getPricesExtremes = (sortByField, sortOrder, paramMap) => asyncHandler(async (req, res) => {
    for (const [param, queryKey] of Object.entries(paramMap)) {
        if (req.params[param]) req.query[queryKey] = req.params[param];
    }
    req.query.sortBy = sortByField;
    req.query.sortOrder = sortOrder;
    req.query.limit = req.query.limit || 10;
    return getPrices(req, res);
});

const getHighestByYear = getPricesExtremes('value', 'desc', { year: 'year' });
const getLowestByYear = getPricesExtremes('value', 'asc', { year: 'year' });
const getHighestByMonth = getPricesExtremes('value', 'desc', { month: 'month' });
const getLowestByMonth = getPricesExtremes('value', 'asc', { month: 'month' });

// ==========================
// Advanced Named Routes
// ==========================
const getRandomPrices = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;
    const data = await DataPoint.aggregate([{ $sample: { size: limit } }]);
    return res.status(200).json(new ApiResponse(200, { data }, "Random prices retrieved"));
});

const getTrendingPrices = asyncHandler(async (req, res) => {
    req.query.sortBy = 'value';
    req.query.sortOrder = 'desc';
    return getPrices(req, res);
});

const getRecentPrices = asyncHandler(async (req, res) => {
    req.query.sortBy = 'createdAt';
    req.query.sortOrder = 'desc';
    return getPrices(req, res);
});

const getLatestPrices = asyncHandler(async (req, res) => {
    req.query.sortBy = 'year';
    req.query.sortOrder = 'desc';
    return getPrices(req, res);
});

const getHighValuePrices = asyncHandler(async (req, res) => {
    req.query.minValue = 100; // Arbitrary high value threshold
    return getPrices(req, res);
});

const getLowValuePrices = asyncHandler(async (req, res) => {
    req.query.maxValue = 10; // Arbitrary low value threshold
    return getPrices(req, res);
});

module.exports = {
    getPrices,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice,
    getPricesByYear,
    getPricesByMonth,
    getPricesByIndicator,
    getPricesByValue,
    getPricesByFrequency,
    getPricesByRange,
    getPricesByCountry,
    getPricesByCountryYear,
    getPricesByCountryMonth,
    getPricesByCountryLatest,
    getPricesByCountryHistory,
    getHighestByYear,
    getLowestByYear,
    getHighestByMonth,
    getLowestByMonth,
    getRandomPrices,
    getTrendingPrices,
    getRecentPrices,
    getLatestPrices,
    getHighValuePrices,
    getLowValuePrices
};
