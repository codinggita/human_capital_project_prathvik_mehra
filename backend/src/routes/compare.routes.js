const express = require("express");
const { getCountryComparison } = require("../controllers/stats.controller");

const router = express.Router();

router.get("/", getCountryComparison);

module.exports = router;
