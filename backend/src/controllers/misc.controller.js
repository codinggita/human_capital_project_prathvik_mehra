const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { DataPoint } = require("../models/dataPoint.model");
const { Country } = require("../models/country.model");
const { Indicator } = require("../models/indicator.model");
const priceService = require("../services/price.service");
const { getPaginationOptions, getPaginatedPayload } = require("../utils/pagination");

const getMonths = asyncHandler(async (req, res) => {
    const paginationOptions = getPaginationOptions(req);
    const months = await DataPoint.distinct("month");
    // Sort logically
    months.sort((a, b) => a - b);
    
    // Manual pagination for distinct
    const paginated = months.slice(paginationOptions.skip, paginationOptions.skip + paginationOptions.limit);
    const payload = getPaginatedPayload(paginated, paginationOptions.page, paginationOptions.limit, months.length);
    
    return res.status(200).json(new ApiResponse(200, payload, "Months retrieved"));
});

const getYears = asyncHandler(async (req, res) => {
    const paginationOptions = getPaginationOptions(req);
    const years = await DataPoint.distinct("year");
    years.sort((a, b) => b - a);
    
    const paginated = years.slice(paginationOptions.skip, paginationOptions.skip + paginationOptions.limit);
    const payload = getPaginatedPayload(paginated, paginationOptions.page, paginationOptions.limit, years.length);
    
    return res.status(200).json(new ApiResponse(200, payload, "Years retrieved"));
});

const searchCountries = asyncHandler(async (req, res) => {
    const { name } = req.query;
    const paginationOptions = getPaginationOptions(req);
    
    const filter = name ? { name: new RegExp(name, "i") } : {};
    const countries = await Country.find(filter)
        .sort(paginationOptions.sort)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);
        
    const totalDocs = await Country.countDocuments(filter);
    const payload = getPaginatedPayload(countries, paginationOptions.page, paginationOptions.limit, totalDocs);
    
    return res.status(200).json(new ApiResponse(200, payload, "Countries searched"));
});

const searchIndicators = asyncHandler(async (req, res) => {
    const { text } = req.query;
    const paginationOptions = getPaginationOptions(req);
    
    const filter = text ? { label: new RegExp(text, "i") } : {};
    const indicators = await Indicator.find(filter)
        .sort(paginationOptions.sort)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);
        
    const totalDocs = await Indicator.countDocuments(filter);
    const payload = getPaginatedPayload(indicators, paginationOptions.page, paginationOptions.limit, totalDocs);
    
    return res.status(200).json(new ApiResponse(200, payload, "Indicators searched"));
});

const searchPrices = asyncHandler(async (req, res) => {
    const { q, value, month, year, freq } = req.query;
    
    // Explicit wrappers passing to price logic
    if (value) req.query.minValue = value;
    if (value) req.query.maxValue = value;
    if (month) req.query.month = month;
    if (year) req.query.year = year;
    if (freq) req.query.frequency = freq;
    
    const filter = priceService.buildFilter(req.query);
    const paginationOptions = getPaginationOptions(req);
    
    const { data, totalDocs } = await priceService.getPrices(filter, paginationOptions);
    const payload = getPaginatedPayload(data, paginationOptions.page, paginationOptions.limit, totalDocs);
    
    return res.status(200).json(new ApiResponse(200, payload, "Prices searched"));
});

module.exports = {
    getMonths,
    getYears,
    searchCountries,
    searchIndicators,
    searchPrices
};
