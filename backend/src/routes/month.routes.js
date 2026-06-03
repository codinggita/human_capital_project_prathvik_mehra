const express = require("express");
const router = express.Router();
const Price = require("../models/price.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const months = await Price.distinct("month");
    const sortedMonths = months.filter((m) => m !== null).sort((a, b) => a - b);
    return successResponse(
      res,
      200,
      "Months fetched successfully",
      sortedMonths,
    );
  }),
);

module.exports = router;
