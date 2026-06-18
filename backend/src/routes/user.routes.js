const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

// All routes require authentication
router.use(verifyJWT);

router.get("/", userController.getAllUsers);
router.put("/me", userController.updateMe);

module.exports = router;
