const express = require("express");
const countryRoutes = require("./country.routes");
const indicatorRoutes = require("./indicator.routes");

const router = express.Router();

router.use("/countries", countryRoutes);
router.use("/indicators", indicatorRoutes);

module.exports = router;
