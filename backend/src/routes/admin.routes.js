const express = require("express");
const { verifyJWT, verifyAdmin } = require("../middlewares/auth.middleware");
const { getPrices, createPrice, updatePrice, deletePrice } = require("../controllers/price.controller");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { getPaginationOptions } = require("../utils/pagination");
const statsService = require("../services/stats.service");

const router = express.Router();

// All admin routes require JWT and admin role
router.use(verifyJWT, verifyAdmin);

// Admin Price CRUD
router.get("/prices", getPrices);
router.post("/prices", createPrice);
router.patch("/prices/:priceId", updatePrice);
router.delete("/prices/:priceId", deletePrice);

// Admin Dashboard
router.get("/dashboard", asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, { message: "Admin dashboard accessible" }, "Admin dashboard"));
}));

// Admin Statistics
router.get("/stats", asyncHandler(async (req, res) => {
    const data = await statsService.getGlobalAverage(req.query.indicator || "SP.POP.TOTL", req.query.year);
    res.status(200).json(new ApiResponse(200, data, "Admin statistics fetched"));
}));

module.exports = router;
