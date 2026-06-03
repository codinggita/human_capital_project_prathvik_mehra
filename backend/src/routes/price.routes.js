const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const priceController = require("../controllers/price.controller");
const { protect, verifyJWT } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const { validateRequest } = require("../middlewares/validate.middleware");

const apiLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
const spamLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.use(apiLimiter);

// ---------------------------------------------------------
// Specialized Advance Routes (Must precede parameter routes)
// ---------------------------------------------------------
router.get("/latest", priceController.getLatestPrices);
router.get("/trending", priceController.getTrendingPrices);
router.get("/recent", priceController.getRecentPrices);
router.get("/random", priceController.getRandomPrices);
router.get("/high-value", priceController.getHighValuePrices);
router.get("/low-value", priceController.getLowValuePrices);
router.get("/highest", priceController.getHighestPrices);
router.get("/lowest", priceController.getLowestPrices);

// ---------------------------------------------------------
// Route Parameter Endpoints
// ---------------------------------------------------------
router.get("/country/:countryCode", priceController.getPricesByCountry);
router.get("/year/:year", priceController.getPricesByYear);
router.get("/month/:month", priceController.getPricesByMonth);
router.get("/indicator/:indicator", priceController.getPricesByIndicator);
router.get("/value/:value", priceController.getPricesByValue);
router.get("/frequency/:freq", priceController.getPricesByFrequency);
router.get("/range/:startYear/:endYear", priceController.getPricesByYearRange);

// Complex Combined Route Parameters
router.get(
  "/country/:countryCode/year/:year",
  priceController.getCountryPricesByYear,
);
router.get(
  "/country/:countryCode/month/:month",
  priceController.getCountryPricesByMonth,
);
router.get(
  "/country/:countryCode/latest",
  priceController.getLatestCountryPrices,
);
router.get(
  "/country/:countryCode/history",
  priceController.getCountryPriceHistory,
);

router.get("/year/:year/highest", priceController.getHighestPricesInYear);
router.get("/year/:year/lowest", priceController.getLowestPricesInYear);
router.get("/month/:month/highest", priceController.getHighestPricesInMonth);
router.get("/month/:month/lowest", priceController.getLowestPricesInMonth);

// ---------------------------------------------------------
// Standard CRUD Operations (Includes Query Params like page, sort, etc)
// ---------------------------------------------------------
router
  .route("/")
  .get(priceController.getPrices)
  .post(protect, spamLimiter, priceController.createPrice)
  .head(priceController.getPricesHeaders)
  .options(priceController.getPricesOptions);

router
  .route("/:priceId")
  .get(priceController.getPriceById)
  .put(verifyJWT, priceController.replacePrice)
  .patch(verifyJWT, priceController.updatePrice)
  .delete(verifyJWT, spamLimiter, priceController.deletePrice)

  .head(priceController.getPriceHeaders)
  .options(priceController.getPriceOptions);

module.exports = router;
