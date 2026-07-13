/**
 * Centralized constants for the frontend.
 * All magic strings, options, and config values live here.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ems-vdj9.onrender.com/";

// Route paths used in React Router
export const ROUTES = {
  DASHBOARD: "/",
  EMPLOYEES: "/employees",
  ADD_EMPLOYEE: "/employees/add",
  EDIT_EMPLOYEE: "/employees/edit/:id",
};

// Department options for forms and filters
export const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Design",
  "Product",
  "Support",
];

// Status options
export const STATUSES = ["Active", "Inactive"];

// Designation options for forms
export const DESIGNATIONS = [
  "Intern",
  "Junior Developer",
  "Senior Developer",
  "Team Lead",
  "Manager",
  "Director",
  "VP",
  "Designer",
  "Analyst",
  "Executive",
];
