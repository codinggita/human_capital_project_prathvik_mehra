const express = require("express");
const router = express.Router();

// Controllers & Middlewares
const indicatorController = require("../controllers/indicator.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

// Indicator summary routes
router.get("/summary", indicatorController.getIndicatorSummary);

// Standard CRUD routes
router
  .route("/")
  .get(indicatorController.getIndicators)
  .post(protect, authorizeRoles("admin"), indicatorController.createIndicator);

router
  .route("/:id")
  .get(indicatorController.getIndicatorById)
  .patch(protect, authorizeRoles("admin"), indicatorController.updateIndicator)
  .delete(
    protect,
    authorizeRoles("admin"),
    indicatorController.deleteIndicator,
  );

module.exports = router;
