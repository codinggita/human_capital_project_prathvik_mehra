const express = require("express");
const c = require("../controllers/price.controller");

const router = express.Router();

// Advanced Named Routes
router.get("/random", c.getRandomPrices);
router.get("/trending", c.getTrendingPrices);
router.get("/recent", c.getRecentPrices);
router.get("/latest", c.getLatestPrices);
router.get("/high-value", c.getHighValuePrices);
router.get("/low-value", c.getLowValuePrices);

// Extremes Routes
router.get("/year/:year/highest", c.getHighestByYear);
router.get("/year/:year/lowest", c.getLowestByYear);
router.get("/month/:month/highest", c.getHighestByMonth);
router.get("/month/:month/lowest", c.getLowestByMonth);

// Country Parameter Routes
router.get("/country/:countryCode", c.getPricesByCountry);
router.get("/country/:countryCode/year/:year", c.getPricesByCountryYear);
router.get("/country/:countryCode/month/:month", c.getPricesByCountryMonth);
router.get("/country/:countryCode/latest", c.getPricesByCountryLatest);
router.get("/country/:countryCode/history", c.getPricesByCountryHistory);

// Core Parameter Routes
router.get("/year/:year", c.getPricesByYear);
router.get("/month/:month", c.getPricesByMonth);
router.get("/indicator/:indicator", c.getPricesByIndicator);
router.get("/value/:value", c.getPricesByValue);
router.get("/frequency/:freq", c.getPricesByFrequency);
router.get("/range/:startYear/:endYear", c.getPricesByRange);

// Basic CRUD Routes
router.route("/")
    .get(c.getPrices)
    .post(c.createPrice);

router.route("/:priceId")
    .get(c.getPriceById)
    .put(c.updatePrice)
    .patch(c.updatePrice)
    .delete(c.deletePrice);

module.exports = router;
