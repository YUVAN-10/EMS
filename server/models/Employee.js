const mongoose = require("mongoose");
const { DEPARTMENTS, STATUSES } = require("../config/constants");

/**
 * Employee Schema
 * Defines the structure of an employee document in MongoDB.
 */
const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      required: [true, "Employee ID is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: DEPARTMENTS,
        message: "{VALUE} is not a valid department",
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: STATUSES,
        message: "{VALUE} is not a valid status",
      },
      default: "Active",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index for faster search queries
employeeSchema.index({ fullName: "text" });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
