const express = require("express");
const router = express.Router();

// Controllers
const healthController = require("../controllers/health.controller");

// Server health and versioning routes
router.get("/", healthController.getHealthStatus);
router.get("/version", healthController.getAppVersion);
router.get("/metrics", healthController.getMetrics);
router.get("/server-status", healthController.getServerStatus);
router.head("/", healthController.healthHeadCheck);
router.options("/", healthController.healthOptions);

module.exports = router;
