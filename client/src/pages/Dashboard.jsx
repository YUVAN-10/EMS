import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";
import StatCard from "../components/dashboard/StatCard";
import EmployeeTable from "../components/employees/EmployeeTable";
import Loader from "../components/common/Loader";
import { useStats } from "../hooks/useEmployees";
import { useEmployees } from "../hooks/useEmployees";
import "./Dashboard.css";

/**
 * Dashboard page.
 * Shows stat cards (total, active, inactive) and a recent employees table.
 */
const Dashboard = () => {
  const { stats, loading: statsLoading } = useStats();
  const { employees, loading: listLoading } = useEmployees({ limit: 5 });

  if (statsLoading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      {/* Stat Cards */}
      <div className="dashboard__stats">
        <StatCard
          title="Total Employees"
          count={stats.total}
          icon={<FiUsers />}
          color="orange"
        />
        <StatCard
          title="Active Employees"
          count={stats.active}
          icon={<FiUserCheck />}
          color="green"
        />
        <StatCard
          title="Inactive Employees"
          count={stats.inactive}
          icon={<FiUserX />}
          color="gray"
        />
      </div>

      {/* Recent Employees */}
      <div className="dashboard__recent">
        <div className="dashboard__recent-header">
          <h2 className="dashboard__section-title">Recent Employees</h2>
          <p className="dashboard__section-subtitle">Latest 5 employees added</p>
        </div>
        {listLoading ? (
          <Loader size="sm" text="Loading..." />
        ) : (
          <EmployeeTable employees={employees} showActions={false} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
