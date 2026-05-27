const express = require("express");
const c = require("../controllers/stats.controller");

const router = express.Router();

// Exact Path Parameter Routes
router.get("/country/:countryCode", c.getStatsByCountry);
router.get("/year/:year", c.getStatsByYear);
router.get("/month/:month", c.getStatsByMonth);

// Named Stats Routes
router.get("/prices", c.getPriceStats);
router.get("/highest-value", c.getHighestValue);
router.get("/lowest-value", c.getLowestValue);
router.get("/monthly-average", c.getMonthlyAverage);
router.get("/yearly-average", c.getYearlyAverage);
router.get("/top-countries", c.getTopCountries);
router.get("/top-indicators", c.getTopIndicators);
router.get("/value-distribution", c.getValueDistribution);
router.get("/records-count", c.getRecordsCount);
router.get("/trending", c.getTrending);

// Original Query-Based Routes
router.get("/average", c.getGlobalAverage);
router.get("/top-performers", c.getTopPerformers);

module.exports = router;
