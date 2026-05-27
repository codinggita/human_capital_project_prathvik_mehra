const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Database configuration error: MONGO_URI environment variable is not defined.');
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    }

    const options = {
      autoIndex: true, // Auto-build indexes in development; might disable in production for large datasets, but set true for initial compilation
    };

    const conn = await mongoose.connect(mongoUri, options);
    
    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    }
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

// Graceful closure hook on application exit
const handleGracefulShutdown = async (signal) => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB connection terminated gracefully via ${signal}`);
    }
  }
  process.exit(0);
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

module.exports = connectDB;
