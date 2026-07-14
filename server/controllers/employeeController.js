const Employee = require("../models/Employee");
const { successResponse, errorResponse } = require("../utils/helpers");
const { PAGINATION } = require("../config/constants");

/**
 * GET /api/employees/stats
 * Returns dashboard statistics — total, active, and inactive employee counts.
 */
const getStats = async (req, res, next) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: "Active" });
    const inactive = await Employee.countDocuments({ status: "Inactive" });

    return successResponse(res, 200, "Stats fetched successfully", {
      total,
      active,
      inactive,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/employees
 * Returns paginated list of employees with optional search and filters.
 *
 * Query params:
 *   - search: search by name (partial match, case-insensitive)
 *   - department: filter by department
 *   - status: filter by status (Active / Inactive)
 *   - page: page number (default 1)
 *   - limit: results per page (default 10)
 */
const getEmployees = async (req, res, next) => {
  try {
    const {
      search,
      department,
      status,
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
    } = req.query;

    // Build the filter object dynamically
    const filter = {};

    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      filter.$or = [
        { fullName: searchRegex },
        { employeeId: searchRegex }
      ];
    }

    if (department) {
      filter.department = department;
    }

    if (status) {
      filter.status = status;
    }

    // Parse pagination values
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(
      Math.max(1, parseInt(limit, 10) || PAGINATION.DEFAULT_LIMIT),
      PAGINATION.MAX_LIMIT
    );
    const skip = (pageNum - 1) * limitNum;

    // Run query and count in parallel for performance
    const [employees, totalCount] = await Promise.all([
      Employee.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Employee.countDocuments(filter),
    ]);

    return successResponse(res, 200, "Employees fetched successfully", {
      employees,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/employees/:id
 * Returns a single employee by ID.
 */
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();

    if (!employee) {
      return errorResponse(res, 404, "Employee not found");
    }

    return successResponse(res, 200, "Employee fetched successfully", employee);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/employees
 * Creates a new employee record.
 */
const createEmployee = async (req, res, next) => {
  try {
    const { fullName, email, mobile, department, designation, joiningDate, status } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      return errorResponse(res, 409, "An employee with this email already exists");
    }

    // Generate unique sequential employeeId (e.g. EMS1001, EMS1002, etc.)
    const lastEmployee = await Employee.findOne({}, { employeeId: 1 }).sort({ createdAt: -1 });
    let nextId = 1001;
    if (lastEmployee && lastEmployee.employeeId) {
      const numericPart = parseInt(lastEmployee.employeeId.replace("EMS", ""), 10);
      if (!isNaN(numericPart)) {
        nextId = numericPart + 1;
      }
    }
    const employeeId = `EMS${nextId}`;

    const employee = await Employee.create({
      employeeId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      department,
      designation: designation.trim(),
      joiningDate,
      status: status || "Active",
    });

    return successResponse(res, 201, "Employee created successfully", employee);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/employees/:id
 * Updates an existing employee record.
 */
const updateEmployee = async (req, res, next) => {
  try {
    const { fullName, email, mobile, department, designation, joiningDate, status } = req.body;

    // Check if employee exists
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return errorResponse(res, 404, "Employee not found");
    }

    // If email changed, check for duplicates
    if (email && email.toLowerCase() !== employee.email) {
      const duplicateEmail = await Employee.findOne({ email: email.toLowerCase() });
      if (duplicateEmail) {
        return errorResponse(res, 409, "An employee with this email already exists");
      }
    }

    // Update fields
    employee.fullName = fullName?.trim() || employee.fullName;
    employee.email = email?.trim().toLowerCase() || employee.email;
    employee.mobile = mobile?.trim() || employee.mobile;
    employee.department = department || employee.department;
    employee.designation = designation?.trim() || employee.designation;
    employee.joiningDate = joiningDate || employee.joiningDate;
    employee.status = status || employee.status;

    const updatedEmployee = await employee.save();

    return successResponse(res, 200, "Employee updated successfully", updatedEmployee);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/employees/:id
 * Deletes an employee record.
 */
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return errorResponse(res, 404, "Employee not found");
    }

    await Employee.findByIdAndDelete(req.params.id);

    return successResponse(res, 200, "Employee deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
