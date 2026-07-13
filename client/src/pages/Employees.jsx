import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import EmployeeTable from "../components/employees/EmployeeTable";
import FilterBar from "../components/employees/FilterBar";
import { useEmployees } from "../hooks/useEmployees";
import { deleteEmployee } from "../services/employeeService";
import "./Employees.css";

/**
 * Employees listing page.
 * Features search, filters, pagination, and delete confirmation.
 */
const Employees = () => {
  const navigate = useNavigate();

  // Search and filter state
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: "", status: "" });
  const [page, setPage] = useState(1);

  // Fetch employees with current params
  const { employees, pagination, loading, refetch } = useEmployees({
    search,
    ...filters,
    page,
    limit: 10,
  });

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handlers
  const handleSearch = useCallback((term) => {
    setSearch(term);
    setPage(1); // reset to page 1 on new search
  }, []);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ department: "", status: "" });
    setPage(1);
  }, []);

  const handleDeleteClick = (employee) => {
    setDeleteTarget(employee);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteEmployee(deleteTarget._id);
      toast.success(`${deleteTarget.fullName} has been deleted`);
      setDeleteTarget(null);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="employees-page">
      {/* Toolbar: Search + Filters + Add button */}
      <div className="employees-page__toolbar">
        <div className="employees-page__toolbar-left">
          <SearchBar onSearch={handleSearch} />
          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>
        <Button
          icon={<FiPlus />}
          onClick={() => navigate("/employees/add")}
          id="add-employee-btn"
        >
          Add Employee
        </Button>
      </div>

      {/* Results info */}
      {!loading && pagination.totalCount !== undefined && (
        <p className="employees-page__count">
          Showing <strong>{employees.length}</strong> of{" "}
          <strong>{pagination.totalCount}</strong> employees
        </p>
      )}

      {/* Table or Loader */}
      {loading ? (
        <Loader text="Loading employees..." />
      ) : (
        <EmployeeTable employees={employees} onDelete={handleDeleteClick} />
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="employees-page__pagination">
          <button
            className="employees-page__page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Previous
          </button>
          <span className="employees-page__page-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            className="employees-page__page-btn"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        title="Delete Employee"
        message={`Are you sure you want to delete "${deleteTarget?.fullName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Delete"
        loading={deleteLoading}
      />
    </div>
  );
};

export default Employees;
