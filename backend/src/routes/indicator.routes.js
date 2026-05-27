const express = require("express");
const { createIndicator, getAllIndicators, getIndicatorByCode } = require("../controllers/indicator.controller");

const router = express.Router();

router.route("/").post(createIndicator).get(getAllIndicators);
router.route("/:indicatorCode").get(getIndicatorByCode);

module.exports = router;
