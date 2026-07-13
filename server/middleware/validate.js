const { DEPARTMENTS, STATUSES } = require("../config/constants");
const { errorResponse } = require("../utils/helpers");

/**
 * Validate employee data on create or update.
 * Checks required fields, format, and allowed values.
 */
const validateEmployee = (req, res, next) => {
  const { fullName, email, mobile, department, designation, joiningDate, status } = req.body;
  const errors = [];

  // Full Name
  if (!fullName || fullName.trim().length === 0) {
    errors.push("Full name is required");
  } else if (fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters");
  }

  // Email
  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please enter a valid email address");
  }

  // Mobile
  if (!mobile || mobile.trim().length === 0) {
    errors.push("Mobile number is required");
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.push("Mobile number must be exactly 10 digits");
  }

  // Department
  if (!department) {
    errors.push("Department is required");
  } else if (!DEPARTMENTS.includes(department)) {
    errors.push(`Invalid department. Must be one of: ${DEPARTMENTS.join(", ")}`);
  }

  // Designation
  if (!designation || designation.trim().length === 0) {
    errors.push("Designation is required");
  }

  // Joining Date
  if (!joiningDate) {
    errors.push("Joining date is required");
  } else if (isNaN(new Date(joiningDate).getTime())) {
    errors.push("Joining date must be a valid date");
  }

  // Status
  if (status && !STATUSES.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${STATUSES.join(", ")}`);
  }

  // If validation errors exist, return 400
  if (errors.length > 0) {
    return errorResponse(res, 400, "Validation failed", errors);
  }

  next();
};

module.exports = { validateEmployee };
