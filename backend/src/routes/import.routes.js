const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { importLimiter } = require("../middlewares/rateLimit.middleware");

router.use(importLimiter);

router.post(
  "/json",
  protect,
  authorizeRoles("admin"),
  asyncHandler(async (req, res) => {
    return successResponse(res, 201, "Data import initiated", {
      importId: "IMP_" + Date.now(),
      status: "validating",
      recordCount: req.body.data?.length || 0,
    });
  }),
);

module.exports = router;
