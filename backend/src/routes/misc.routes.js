const express = require("express");
const c = require("../controllers/misc.controller");

const router = express.Router();

router.get("/months", c.getMonths);
router.get("/years", c.getYears);
router.get("/search/country", c.searchCountries);
router.get("/search/indicator", c.searchIndicators);
router.get("/search/value", c.searchPrices);
router.get("/search/month", c.searchPrices);
router.get("/search/year", c.searchPrices);
router.get("/search/frequency", c.searchPrices);
router.get("/search/prices", c.searchPrices);

module.exports = router;
