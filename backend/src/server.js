// Handle synchronous uncaught exceptions gracefully before starting anything
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, "../.env") });

// Import the configured Express app and database connection logic
const app = require("./app");
const connectDB = require("./config/db");

// Connect database before starting the server to ensure safety
connectDB();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start the Express server securely
const server = app.listen(PORT, () => {
  console.log(
    `[🚀 Server] Running efficiently in ${NODE_ENV} mode on port ${PORT}...`,
  );
});

// Handle asynchronous unhandled rejections gracefully
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
