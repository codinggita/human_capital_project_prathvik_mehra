const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const priceService = require("../services/price.service");
const { getPaginationOptions, getPaginatedPayload } = require("../utils/pagination");

const getPrices = asyncHandler(async (req, res) => {
    const filter = priceService.buildFilter(req.query);
    const paginationOptions = getPaginationOptions(req);
    
    const { data, totalDocs } = await priceService.getPrices(filter, paginationOptions);
    
    const responsePayload = getPaginatedPayload(data, paginationOptions.page, paginationOptions.limit, totalDocs);

    return res.status(200).json(
        new ApiResponse(200, responsePayload, "Prices retrieved successfully")
    );
});

const getPricesByCountry = asyncHandler(async (req, res) => {
    const { countryCode } = req.params;
    if (!countryCode) throw new ApiError(400, "Country code is required");
    
    // Check if we need to query by objectId or populate it.
    // In our schema, `country` refs the Country schema's Object ID, not the code directly.
    // So we first find the Country by countryCode, then pass its _id.
    const { Country } = require("../models/country.model");
    const country = await Country.findOne({ countryCode });
    
    if (!country) {
        throw new ApiError(404, "Country not found");
    }

    req.query.country = country._id;
    const filter = priceService.buildFilter(req.query);
    const paginationOptions = getPaginationOptions(req);
    
    const { data, totalDocs } = await priceService.getPrices(filter, paginationOptions);
    
    const responsePayload = getPaginatedPayload(data, paginationOptions.page, paginationOptions.limit, totalDocs);

    return res.status(200).json(
        new ApiResponse(200, responsePayload, `Prices for ${countryCode} retrieved successfully`)
    );
});

module.exports = {
    getPrices,
    getPricesByCountry
};
