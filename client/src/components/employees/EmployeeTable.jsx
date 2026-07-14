import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import Badge from "../common/Badge";
import { formatDate, getInitials } from "../../utils/helpers";
import "./EmployeeTable.css";

/**
 * Employee data table.
 * Displays employee list in rows with actions (view, edit, delete).
 *
 * Props:
 *   employees — array of employee objects
 *   onDelete  — callback when delete icon is clicked: (employee) => void
 *   showActions — whether to show action buttons (default: true)
 */
const EmployeeTable = ({ employees, onDelete, showActions = true }) => {
  const navigate = useNavigate();

  if (employees.length === 0) {
    return (
      <div className="employee-table__empty">
        <div className="employee-table__empty-icon">📋</div>
        <h3>No Employees Found</h3>
        <p>Try adjusting your search or filters, or add a new employee.</p>
      </div>
    );
  }

  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id} style={{ animationDelay: `${index * 0.03}s` }}>
              <td>
                <div className="employee-table__name-cell">
                  <div className="employee-table__avatar">
                    {getInitials(employee.fullName)}
                  </div>
                  <div className="employee-table__name-info">
                    <span className="employee-table__name">{employee.fullName}</span>
                    <span className="employee-table__id">{employee.employeeId}</span>
                  </div>
                </div>
              </td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>
                <span className="employee-table__dept">{employee.department}</span>
              </td>
              <td>{employee.designation}</td>
              <td>{formatDate(employee.joiningDate)}</td>
              <td>
                <Badge status={employee.status} />
              </td>
              {showActions && (
                <td>
                  <div className="employee-table__actions">
                    <button
                      className="employee-table__action-btn employee-table__action-btn--view"
                      onClick={() => navigate(`/employees/edit/${employee._id}`)}
                      title="View / Edit"
                      aria-label={`View ${employee.fullName}`}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="employee-table__action-btn employee-table__action-btn--edit"
                      onClick={() => navigate(`/employees/edit/${employee._id}`)}
                      title="Edit"
                      aria-label={`Edit ${employee.fullName}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="employee-table__action-btn employee-table__action-btn--delete"
                      onClick={() => onDelete(employee)}
                      title="Delete"
                      aria-label={`Delete ${employee.fullName}`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
