/**
 * Frontend utility / helper functions.
 */

/**
 * Format a date string to a readable format like "15 Jan 2025".
 */
export const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format a date string to YYYY-MM-DD for HTML date inputs.
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

/**
 * Validate an email address format.
 */
export const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

/**
 * Validate a 10-digit mobile number.
 */
export const isValidMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};

/**
 * Simple debounce utility.
 * Delays function execution until after `delay` ms of inactivity.
 */
export const debounce = (fn, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get initials from a full name (e.g., "John Doe" → "JD").
 */
export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
};
