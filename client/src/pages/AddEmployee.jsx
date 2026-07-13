import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeForm from "../components/employees/EmployeeForm";
import { createEmployee } from "../services/employeeService";
import "./FormPage.css";

/**
 * Add Employee page.
 * Renders the EmployeeForm in "create" mode.
 */
const AddEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createEmployee(formData);
      toast.success("Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add employee";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page__header">
        <h2 className="form-page__title">Add New Employee</h2>
        <p className="form-page__subtitle">Fill in the details below to add a new team member.</p>
      </div>
      <EmployeeForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Add Employee"
      />
    </div>
  );
};

export default AddEmployee;
