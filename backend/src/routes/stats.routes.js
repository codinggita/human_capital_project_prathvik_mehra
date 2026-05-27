const express = require("express");
const { getGlobalAverage, getTopPerformers } = require("../controllers/stats.controller");

const router = express.Router();

router.get("/average", getGlobalAverage);
router.get("/top-performers", getTopPerformers);

module.exports = router;
