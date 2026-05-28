const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const statsService = require("../services/stats.service");
const { DataPoint } = require("../models/dataPoint.model");
const { Country } = require("../models/country.model");
const { Indicator } = require("../models/indicator.model");

// ==========================
// Original Handlers
// ==========================
const getGlobalAverage = asyncHandler(async (req, res) => {
    const { indicator, year } = req.query;
    if (!indicator) throw new ApiError(400, "Indicator code is required for average calculation");
    const data = await statsService.getGlobalAverage(indicator, year);
    if (!data) throw new ApiError(404, "Data not found for the given indicator");
    return res.status(200).json(new ApiResponse(200, data, "Global average calculated successfully"));
});

const getTopPerformers = asyncHandler(async (req, res) => {
    const { indicator, year, limit = 10, order = "desc" } = req.query;
    if (!indicator) throw new ApiError(400, "Indicator code is required");
    const sortOrder = order === "asc" ? 1 : -1;
    const data = await statsService.getTopCountries(indicator, year, limit, sortOrder);
    if (!data) throw new ApiError(404, "Data not found for the given parameters");
    return res.status(200).json(new ApiResponse(200, data, "Top performers retrieved successfully"));
});

const getCountryComparison = asyncHandler(async (req, res) => {
    const { country1, country2, indicator } = req.query;
    if (!country1 || !country2 || !indicator) throw new ApiError(400, "country1, country2, and indicator codes are required");
    const data = await statsService.compareCountries(country1, country2, indicator);
    if (!data) throw new ApiError(404, "Comparison data not found");
    return res.status(200).json(new ApiResponse(200, data, "Country comparison retrieved successfully"));
});

// ==========================
// Explicit Path Handlers (Batch 4)
// ==========================
const getStatsByCountry = asyncHandler(async (req, res) => {
    const { countryCode } = req.params;
    const country = await Country.findOne({ countryCode });
    if (!country) throw new ApiError(404, "Country not found");

    const result = await DataPoint.aggregate([
        { $match: { country: country._id } },
        {
            $group: {
                _id: "$year",
                avgValue: { $avg: "$value" },
                minValue: { $min: "$value" },
                maxValue: { $max: "$value" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, result, `Statistics for ${countryCode}`));
});

const getStatsByYear = asyncHandler(async (req, res) => {
    const { year } = req.params;
    const result = await DataPoint.aggregate([
        { $match: { year: parseInt(year, 10) } },
        {
            $group: {
                _id: "$indicator",
                avgValue: { $avg: "$value" },
                minValue: { $min: "$value" },
                maxValue: { $max: "$value" },
                count: { $sum: 1 }
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, result, `Statistics for year ${year}`));
});

const getStatsByMonth = asyncHandler(async (req, res) => {
    const { month } = req.params;
    const result = await DataPoint.aggregate([
        { $match: { month: parseInt(month, 10) } },
        {
            $group: {
                _id: "$year",
                avgValue: { $avg: "$value" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, result, `Statistics for month ${month}`));
});

const getHighestValue = asyncHandler(async (req, res) => {
    const result = await DataPoint.findOne().sort({ value: -1 })
        .populate("country", "_id name")
        .populate("indicator", "_id label")
        .lean({ virtuals: true });
    return res.status(200).json(new ApiResponse(200, result, "Highest price value record"));
});

const getLowestValue = asyncHandler(async (req, res) => {
    const result = await DataPoint.findOne({ value: { $gt: 0 } }).sort({ value: 1 })
        .populate("country", "_id name")
        .populate("indicator", "_id label")
        .lean({ virtuals: true });
    return res.status(200).json(new ApiResponse(200, result, "Lowest price value record"));
});

const getMonthlyAverage = asyncHandler(async (req, res) => {
    const result = await DataPoint.aggregate([
        {
            $group: {
                _id: "$month",
                avgValue: { $avg: "$value" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, result, "Monthly averages calculated"));
});

const getYearlyAverage = asyncHandler(async (req, res) => {
    const result = await DataPoint.aggregate([
        {
            $group: {
                _id: "$year",
                avgValue: { $avg: "$value" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, result, "Yearly averages calculated"));
});

const getPriceStats = asyncHandler(async (req, res) => {
    const result = await DataPoint.aggregate([
        {
            $group: {
                _id: null,
                totalRecords: { $sum: 1 },
                avgValue: { $avg: "$value" },
                minValue: { $min: "$value" },
                maxValue: { $max: "$value" }
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, result[0] || {}, "Price statistics"));
});

const getTopCountries = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await DataPoint.aggregate([
        {
            $group: {
                _id: "$country",
                avgValue: { $avg: "$value" },
                count: { $sum: 1 }
            }
        },
        { $sort: { avgValue: -1 } },
        { $limit: limit },
        {
            $lookup: {
                from: "countries",
                localField: "_id",
                foreignField: "_id",
                as: "country"
            }
        },
        { $unwind: "$country" },
        {
            $project: {
                countryCode: "$country.countryCode",
                countryName: "$country.countryName",
                avgValue: 1,
                count: 1
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, result, "Top countries by average value"));
});

const getTopIndicators = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await DataPoint.aggregate([
        { $group: { _id: "$indicator", count: { $sum: 1 }, avgValue: { $avg: "$value" } } },
        { $sort: { count: -1 } },
        { $limit: limit },
        { $lookup: { from: "indicators", localField: "_id", foreignField: "_id", as: "indicator" } },
        { $unwind: "$indicator" },
        { $project: { indicatorCode: "$indicator.indicatorCode", indicatorLabel: "$indicator.indicatorLabel", count: 1, avgValue: 1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, result, "Top indicators by record count"));
});

const getValueDistribution = asyncHandler(async (req, res) => {
    const result = await DataPoint.aggregate([
        {
            $bucket: {
                groupBy: "$value",
                boundaries: [0, 10, 50, 100, 500, 1000, 5000],
                default: "5000+",
                output: { count: { $sum: 1 }, avgValue: { $avg: "$value" } }
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, result, "Value distribution buckets"));
});

const getRecordsCount = asyncHandler(async (req, res) => {
    const [prices, countries, indicators] = await Promise.all([
        DataPoint.countDocuments(),
        Country.countDocuments(),
        Indicator.countDocuments()
    ]);
    return res.status(200).json(new ApiResponse(200, { prices, countries, indicators }, "Total records count"));
});

const getTrending = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await DataPoint.find()
        .sort({ value: -1, year: -1 })
        .limit(limit)
        .populate("country", "countryCode countryName")
        .populate("indicator", "indicatorCode indicatorLabel")
        .lean();
    return res.status(200).json(new ApiResponse(200, result, "Trending statistics"));
});

module.exports = {
    getGlobalAverage,
    getTopPerformers,
    getCountryComparison,
    getStatsByCountry,
    getStatsByYear,
    getStatsByMonth,
    getHighestValue,
    getLowestValue,
    getMonthlyAverage,
    getYearlyAverage,
    getPriceStats,
    getTopCountries,
    getTopIndicators,
    getValueDistribution,
    getRecordsCount,
    getTrending
};
