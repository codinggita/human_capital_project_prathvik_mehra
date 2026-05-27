const express = require("express");
const authRoutes = require("./auth.routes");
const countryRoutes = require("./country.routes");
const indicatorRoutes = require("./indicator.routes");
const priceRoutes = require("./price.routes");
const statsRoutes = require("./stats.routes");
const compareRoutes = require("./compare.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/countries", countryRoutes);
router.use("/indicators", indicatorRoutes);
router.use("/prices", priceRoutes);
router.use("/stats", statsRoutes);
router.use("/compare", compareRoutes);

module.exports = router;
