const express = require("express");
const router = express.Router();
const Price = require("../models/price.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const years = await Price.distinct("year");
    const sortedYears = years.sort((a, b) => b - a); // Descending
    return successResponse(res, 200, "Years fetched successfully", sortedYears);
  }),
);

module.exports = router;
