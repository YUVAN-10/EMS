/**
 * Centralized constants used across the backend.
 * Keep all magic strings and config values here for easy maintenance.
 */

const DEPARTMENTS = [
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

const STATUSES = ["Active", "Inactive"];

const DESIGNATIONS = [
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

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

module.exports = {
  DEPARTMENTS,
  STATUSES,
  DESIGNATIONS,
  PAGINATION,
};
