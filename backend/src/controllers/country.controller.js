const { Country } = require("../models/country.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");

const createCountry = asyncHandler(async (req, res) => {
    const { countryCode, countryName } = req.body;

    if (!countryCode || !countryName) {
        throw new ApiError(400, "Country code and name are required");
    }

    const existingCountry = await Country.findOne({ countryCode });
    if (existingCountry) {
        throw new ApiError(409, "Country with this code already exists");
    }

    const country = await Country.create({ countryCode, countryName });

    return res.status(201).json(
        new ApiResponse(201, country, "Country created successfully")
    );
});

const getAllCountries = asyncHandler(async (req, res) => {
    const countries = await Country.find({});
    return res.status(200).json(
        new ApiResponse(200, countries, "Countries retrieved successfully")
    );
});

const getCountryByCode = asyncHandler(async (req, res) => {
    const { countryCode } = req.params;
    const country = await Country.findOne({ countryCode });

    if (!country) {
        throw new ApiError(404, "Country not found");
    }

    return res.status(200).json(
        new ApiResponse(200, country, "Country retrieved successfully")
    );
});

module.exports = {
    createCountry,
    getAllCountries,
    getCountryByCode
};
