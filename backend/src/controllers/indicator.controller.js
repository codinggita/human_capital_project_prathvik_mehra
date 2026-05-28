const { Indicator } = require("../models/indicator.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");

const createIndicator = asyncHandler(async (req, res) => {
    const { indicatorCode, indicatorLabel } = req.body;

    if (!indicatorCode || !indicatorLabel) {
        throw new ApiError(400, "Indicator code and label are required");
    }

    // _id IS the indicatorCode in our schema
    const existingIndicator = await Indicator.findById(indicatorCode.toUpperCase());
    if (existingIndicator) {
        throw new ApiError(409, "Indicator with this code already exists");
    }

    const indicator = await Indicator.create({ _id: indicatorCode.toUpperCase(), label: indicatorLabel });

    return res.status(201).json(
        new ApiResponse(201, indicator, "Indicator created successfully")
    );
});

const getAllIndicators = asyncHandler(async (req, res) => {
    const indicators = await Indicator.find({});
    return res.status(200).json(
        new ApiResponse(200, indicators, "Indicators retrieved successfully")
    );
});

const getIndicatorByCode = asyncHandler(async (req, res) => {
    const { indicatorCode } = req.params;
    // _id IS the indicatorCode - use findById for efficiency
    const indicator = await Indicator.findById(indicatorCode.toUpperCase());

    if (!indicator) {
        throw new ApiError(404, "Indicator not found");
    }

    return res.status(200).json(
        new ApiResponse(200, indicator, "Indicator retrieved successfully")
    );
});

module.exports = {
    createIndicator,
    getAllIndicators,
    getIndicatorByCode
};
