const express = require("express");
const router = express.Router();

// Controllers
const compareController = require("../controllers/compare.controller");

// Analytics comparisons requiring specific query parameters
router.get("/", compareController.compareCountries);
router.get("/countries", compareController.compareCountries);
router.get("/indicators", compareController.compareIndicators);
router.get("/year", compareController.compareYears);

module.exports = router;
