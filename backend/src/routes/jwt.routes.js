const express = require("express");
const { verifyJWT, verifyAdmin } = require("../middlewares/auth.middleware");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");

const router = express.Router();

// Helper for quick dummy responses
const ok = (msg) => asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, { user: req.user || null }, msg));
});

// Protected User Routes
router.get("/profile", verifyJWT, ok("JWT protected profile accessed"));
router.get("/dashboard", verifyJWT, ok("JWT protected dashboard accessed"));
router.get("/user", verifyJWT, ok("User route accessed successfully"));

// Admin Only Routes
router.get("/admin", verifyJWT, verifyAdmin, ok("Admin JWT route accessed"));

// Role Check Routes
router.get("/check-role/admin", verifyJWT, verifyAdmin, ok("Admin role verified"));
router.get("/check-role/user", verifyJWT, ok("User role verified"));

// Token Management Routes
router.post("/generate-token", verifyJWT, ok("Token generated (use login endpoint for actual tokens)"));
router.post("/verify-token", verifyJWT, ok("Token is valid and verified"));
router.post("/refresh-token", asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, null, "Refresh token endpoint - provide a valid refresh token"));
}));

module.exports = router;
