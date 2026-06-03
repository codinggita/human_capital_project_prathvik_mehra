const express = require("express");
const router = express.Router();

// Controllers & Middlewares
const countryController = require("../controllers/country.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

// Analytics and metrics routes
router.get("/top", countryController.getTopCountries);
router.get("/metrics/:countryCode", countryController.getCountryMetrics);

// Standard CRUD routes
router
  .route("/")
  .get(countryController.getCountries)
  .post(protect, authorizeRoles("admin"), countryController.createCountry);

router
  .route("/:id")
  .get(countryController.getCountryById)
  .patch(protect, authorizeRoles("admin"), countryController.updateCountry)
  .delete(protect, authorizeRoles("admin"), countryController.deleteCountry);

module.exports = router;
