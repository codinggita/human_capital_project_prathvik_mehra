const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const { protect } = require("../middlewares/auth.middleware");

router.post(
  "/generate",
  protect,
  asyncHandler(async (req, res) => {
    return successResponse(res, 201, "Report generation started", {
      reportId: "REP_" + Date.now(),
      status: "processing",
      estimatedTime: "2 minutes",
    });
  }),
);

module.exports = router;
