const express = require("express");
const { getCountryComparison } = require("../controllers/stats.controller");
const { DataPoint } = require("../models/dataPoint.model");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");

const router = express.Router();

// GET /compare?country1=IND&country2=USA&indicator=...
router.get("/", getCountryComparison);

// GET /compare/year?year1=2000&year2=2020
router.get("/year", asyncHandler(async (req, res) => {
    const { year1, year2 } = req.query;
    const [data1, data2] = await Promise.all([
        DataPoint.aggregate([
            { $match: { year: parseInt(year1, 10) } },
            { $group: { _id: null, avgValue: { $avg: "$value" }, count: { $sum: 1 }, year: { $first: "$year" } } }
        ]),
        DataPoint.aggregate([
            { $match: { year: parseInt(year2, 10) } },
            { $group: { _id: null, avgValue: { $avg: "$value" }, count: { $sum: 1 }, year: { $first: "$year" } } }
        ])
    ]);
    return res.status(200).json(
        new ApiResponse(200, { year1: data1[0] || {}, year2: data2[0] || {} }, `Comparison between year ${year1} and ${year2}`)
    );
}));

module.exports = router;
