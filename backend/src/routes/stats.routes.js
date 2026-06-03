const express = require("express");
const router = express.Router();

const statsController = require("../controllers/stats.controller");

// Aggregation & Global Statistics
router.get("/overview", statsController.getOverviewStats);
router.get("/highest-value", statsController.getHighestValue);
router.get("/lowest-value", statsController.getLowestValue);
router.get("/monthly-average", statsController.getMonthlyAverage);
router.get("/yearly-average", statsController.getYearlyAverage);
router.get("/top-countries", statsController.getTopCountries);
router.get("/top-indicators", statsController.getTopIndicators);
router.get("/value-distribution", statsController.getValueDistribution);
router.get("/records-count", statsController.getRecordsCount);
router.get("/trending", statsController.getTrendingStats);

// Prices metadata statistics
router
  .route("/prices")
  .get(statsController.getPriceStats)
  .head(statsController.getPriceStatsHeaders);

// Parameterized statistics routes
router.get("/country/:countryCode", statsController.getCountryStats);
router.get("/year/:year", statsController.getYearStats);
router.get("/month/:month", statsController.getMonthStats);

module.exports = router;
