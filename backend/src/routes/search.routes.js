const express = require("express");
const router = express.Router();
const { searchLimiter } = require("../middlewares/rateLimit.middleware");

const searchController = require("../controllers/search.controller");

router.use(searchLimiter);

// Core search queries
router
  .route("/prices")
  .get(searchController.searchPrices)
  .options(searchController.searchPricesOptions);

// Parameterized search
router.get("/country", searchController.searchByCountry);
router.get("/indicator", searchController.searchByIndicator);
router.get("/value", searchController.searchByValue);
router.get("/year", searchController.searchByYear);
router.get("/month", searchController.searchByMonth);
router.get("/frequency", searchController.searchByFrequency);
router.get("/advanced", searchController.advancedCombinedSearch);

module.exports = router;
