const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const compareService = require("../services/compare.service");

const compareCountries = asyncHandler(async (req, res) => {
  // Pass query elements directly to service layer
  const data = await compareService.compareCountries(
    req.query.country1,
    req.query.country2,
  );
  return successResponse(res, 200, "Countries compared successfully", data);
});

const compareIndicators = asyncHandler(async (req, res) => {
  const data = await compareService.compareIndicators(
    req.query.indicator1,
    req.query.indicator2,
  );
  return successResponse(res, 200, "Indicators compared successfully", data);
});

const compareYears = asyncHandler(async (req, res) => {
  const data = await compareService.compareYears(
    req.query.year1,
    req.query.year2,
  );
  return successResponse(res, 200, "Years compared successfully", data);
});

module.exports = {
  compareCountries,
  compareIndicators,
  compareYears,
};
