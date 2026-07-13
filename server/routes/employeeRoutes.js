const express = require("express");
const router = express.Router();
const { validateEmployee } = require("../middleware/validate");
const {
  getStats,
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// Dashboard stats — must be before /:id to avoid route conflict
router.get("/stats", getStats);

// CRUD routes
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", validateEmployee, createEmployee);
router.put("/:id", validateEmployee, updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
