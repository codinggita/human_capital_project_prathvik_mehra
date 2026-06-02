const mongoose = require("mongoose");

// Connect MongoDB using Mongoose with modern async patterns
const connectDB = async () => {
  try {
    // Select local or production URI dynamically based on environment
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MongoDB connection string is missing in environment variables",
      );
    }

    const connection = await mongoose.connect(uri);

    // Log connected database host securely without leaking credentials
    console.log(
      `[🗄️ Database] MongoDB Connected Successfully: ${connection.connection.host}`,
    );
  } catch (error) {
    // Handle database connection failure gracefully to prevent server crashes
    console.error(`[❌ Database Error] Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
