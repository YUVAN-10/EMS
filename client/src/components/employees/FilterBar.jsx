import { DEPARTMENTS, STATUSES } from "../../constants";
import "./FilterBar.css";

/**
 * Filter bar for employee listing.
 * Provides Department and Status dropdown filters.
 *
 * Props:
 *   filters   — { department, status } current filter values
 *   onChange  — callback when a filter value changes: (filterName, value) => void
 *   onClear  — callback to clear all filters
 */
const FilterBar = ({ filters, onChange, onClear }) => {
  const hasActiveFilters = filters.department || filters.status;

  return (
    <div className="filter-bar">
      <select
        className="filter-bar__select"
        value={filters.department}
        onChange={(e) => onChange("department", e.target.value)}
        id="filter-department"
      >
        <option value="">All Departments</option>
        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        className="filter-bar__select"
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
        id="filter-status"
      >
        <option value="">All Status</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button className="filter-bar__clear" onClick={onClear}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
