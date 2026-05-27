const express = require("express");
const { createCountry, getAllCountries, getCountryByCode } = require("../controllers/country.controller");

const router = express.Router();

router.route("/").post(createCountry).get(getAllCountries);
router.route("/:countryCode").get(getCountryByCode);

module.exports = router;
