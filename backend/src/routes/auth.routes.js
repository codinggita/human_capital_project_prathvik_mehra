const express = require("express");
const { registerUser, loginUser, getCurrentUser, logout, dummyAuthAction } = require("../controllers/auth.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logout);
router.post("/forgot-password", dummyAuthAction);
router.post("/reset-password", dummyAuthAction);
router.post("/refresh-token", dummyAuthAction);
router.post("/send-otp", dummyAuthAction);
router.post("/verify-otp", dummyAuthAction);
router.post("/change-password", verifyJWT, dummyAuthAction);
router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;
