const mongoose = require("mongoose");

const checkHealthService = async () => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    uptime: process.uptime(),
    database: states[dbState],
    timestamp: new Date().toISOString(),
  };
};

const getVersionService = async () => {
  return {
    version: process.env.API_VERSION || "1.0.0",
    env: process.env.NODE_ENV || "development",
  };
};

const getMetricsService = async () => {
  const mem = process.memoryUsage();
  return {
    memory: {
      rss: `${Math.round(mem.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
    },
  };
};

const getServerStatusService = async () => {
  return { status: "Online", serverTime: new Date() };
};

module.exports = {
  checkHealth: checkHealthService,
  getVersion: getVersionService,
  getMetrics: getMetricsService,
  getServerStatus: getServerStatusService,
};
