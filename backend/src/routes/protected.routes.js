const express = require("express");
const router = express.Router();

// Controllers & Middlewares
const protectedController = require("../controllers/protected.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

// Apply protection middleware to the entire router
router.use(verifyJWT);

// Standard protected routes
router.get("/data", protectedController.getProtectedData);
router.get("/user-activity", protectedController.getUserActivityLogs);

// Protected Price Management (Mapped to price controller but strictly protected here)
const priceController = require("../controllers/price.controller");

router
  .route("/prices")
  .get(priceController.getPrices)
  .post(priceController.createPrice);

router
  .route("/prices/:priceId")
  .patch(priceController.updatePrice)
  .delete(priceController.deletePrice);

module.exports = router;
