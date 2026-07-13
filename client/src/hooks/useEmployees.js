import { useState, useEffect, useCallback } from "react";
import * as employeeService from "../services/employeeService";

/**
 * Custom hook for fetching and managing employee list data.
 * Handles loading, error states, and refetching.
 *
 * @param {Object} params - Query params (search, department, status, page, limit)
 * @returns {Object} { employees, pagination, loading, error, refetch }
 */
export const useEmployees = (params = {}) => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await employeeService.getEmployees(params);
      setEmployees(result.data.employees);
      setPagination(result.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]); // stringify for deep comparison

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, pagination, loading, error, refetch: fetchEmployees };
};

/**
 * Custom hook for fetching dashboard statistics.
 */
export const useStats = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const result = await employeeService.getStats();
      setStats(result.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};
