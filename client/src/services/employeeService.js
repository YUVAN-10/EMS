import api from "./api";

/**
 * Employee API service layer.
 * Each function maps to a backend REST endpoint.
 * Returns the axios response data directly.
 */

// GET /api/employees/stats — dashboard counts
export const getStats = async () => {
  const response = await api.get("/employees/stats");
  return response.data;
};

// GET /api/employees — list with search, filter, pagination
export const getEmployees = async (params = {}) => {
  const response = await api.get("/employees", { params });
  return response.data;
};

// GET /api/employees/:id — single employee
export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

// POST /api/employees — create new employee
export const createEmployee = async (employeeData) => {
  const response = await api.post("/employees", employeeData);
  return response.data;
};

// PUT /api/employees/:id — update existing employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

// DELETE /api/employees/:id — delete employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
