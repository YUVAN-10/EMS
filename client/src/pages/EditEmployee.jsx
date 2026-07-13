import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeForm from "../components/employees/EmployeeForm";
import Loader from "../components/common/Loader";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import "./FormPage.css";

/**
 * Edit Employee page.
 * Fetches existing employee data and renders the EmployeeForm in "edit" mode.
 */
const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch employee data on mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);
        setEmployee(result.data);
      } catch (error) {
        toast.error("Employee not found");
        navigate("/employees");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);
    try {
      await updateEmployee(id, formData);
      toast.success("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update employee";
      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) {
    return <Loader text="Loading employee data..." />;
  }

  return (
    <div className="form-page">
      <div className="form-page__header">
        <h2 className="form-page__title">Edit Employee</h2>
        <p className="form-page__subtitle">
          Update the details for <strong>{employee?.fullName}</strong>.
        </p>
      </div>
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        loading={submitLoading}
        submitLabel="Update Employee"
      />
    </div>
  );
};

export default EditEmployee;
