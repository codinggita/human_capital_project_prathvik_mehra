const express = require("express");
const router = express.Router();

const jwtController = require("../controllers/jwt.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validate.middleware");
const {
  validateJWT,
  validateRefreshToken,
} = require("../validators/jwt.validator");

// Dedicated JWT lifecycle management routes
router.post("/generate-token", jwtController.generateToken);
router.post("/verify-token", jwtController.verifyToken);
router.post("/refresh-token", jwtController.refreshToken);

// JWT Protected resource tests (Middleware applied globally for these)
// Using verifyJWT instead of protect to allow for custom payload testing without DB dependency
router.use(verifyJWT);

router
  .route("/profile")
  .get(jwtController.getJwtProfile)
  .options(jwtController.jwtProfileOptions);

router.get("/dashboard", jwtController.getJwtDashboard);
router.get("/admin", jwtController.getJwtAdmin);
router.get("/user", jwtController.getJwtUser);

// Role verification
router.get("/check-role/admin", jwtController.verifyAdminRole);
router.get("/check-role/user", jwtController.verifyUserRole);

module.exports = router;
