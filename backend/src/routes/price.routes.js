const express = require("express");
const { getPrices, getPricesByCountry } = require("../controllers/price.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

// Apply auth middleware if prices should be protected
// router.use(verifyJWT);

router.route("/").get(getPrices);
router.route("/country/:countryCode").get(getPricesByCountry);

module.exports = router;
