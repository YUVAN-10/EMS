const { errorResponse } = require("../utils/helpers");

/**
 * Global error handling middleware.
 * Catches unhandled errors from route handlers and sends a clean JSON response.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Server Error:", err.message);

  // Mongoose validation error (from schema-level validation)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 400, "Validation failed", messages);
  }

  // Mongoose duplicate key error (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return errorResponse(res, 409, `An employee with this ${field} already exists`);
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return errorResponse(res, 400, "Invalid employee ID format");
  }

  // Default — Internal Server Error
  return errorResponse(res, 500, "Internal server error");
};

module.exports = errorHandler;
