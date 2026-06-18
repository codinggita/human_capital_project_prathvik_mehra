const mongoose = require("mongoose");
const app = require("../backend/src/app");

// Cache the database connection to avoid reconnecting on every serverless invocation
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  console.log("=> using new database connection");
  const dbUri = process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI;
  
  if (!dbUri) {
    throw new Error("MONGODB_URI environment variable is missing");
  }

  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  isConnected = true;
};

// Vercel Serverless Function entry point
module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    // Pass the request to the Express app
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ success: false, message: "Database connection failed", error: error.message });
  }
};
