const mongoose = require("mongoose");

// MongoDB connection URI — defaults to local instance
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ems_db";

/**
 * Connect to MongoDB.
 * Logs success or exits the process on failure.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
