const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const authController = require("../controllers/auth.controller");
const { protect, verifyJWT } = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validate.middleware");

const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateSendOTP,
  validateVerifyOTP,
} = require("../validators/auth.validator");

// Rate limiters to prevent brute force and spam
const isDev = process.env.NODE_ENV === "development";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,                  // 50 attempts (was 5 — too aggressive for dev/testing)
  skip: () => isDev,        // Skip entirely in development
  message: {
    success: false,
    message: "Too many login attempts. Please wait 15 minutes before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,                  // 20 registrations per hour (was 3)
  skip: () => isDev,        // Skip entirely in development
  message: {
    success: false,
    message: "Too many registration attempts. Please wait an hour before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ==========================================
// 🔓 PUBLIC ROUTES
// ==========================================

router.post(
  "/register",
  registerLimiter,
  validateRequest(validateRegister),
  authController.register,
);

router
  .route("/login")
  .post(loginLimiter, validateRequest(validateLogin), authController.login)
  .options(authController.loginOptions);

router.post(
  "/forgot-password",
  validateRequest(validateForgotPassword),
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequest(validateResetPassword),
  authController.resetPassword,
);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/send-otp",
  validateRequest(validateSendOTP),
  authController.sendOtp,
);
router.post(
  "/verify-otp",
  validateRequest(validateVerifyOTP),
  authController.verifyOtp,
);

// ==========================================
// 🔐 PROTECTED ROUTES
// ==========================================

router.use(verifyJWT);

router.post("/logout", authController.logout);

router
  .route("/me")
  .get(authController.getMe)
  .head(authController.checkMeHeaders);

router.post(
  "/change-password",
  validateRequest(validateChangePassword),
  authController.changePassword,
);

module.exports = router;
