import { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { DEPARTMENTS, DESIGNATIONS, STATUSES } from "../../constants";
import { isValidEmail, isValidMobile, formatDateForInput } from "../../utils/helpers";
import "./EmployeeForm.css";

/**
 * Employee form — used for both Add and Edit.
 *
 * Props:
 *   initialData  — existing employee data (null for add mode)
 *   onSubmit     — callback with form data: (formData) => Promise
 *   loading      — submit loading state
 *   submitLabel  — text for submit button (e.g. "Add Employee" or "Update Employee")
 */
const EmployeeForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  submitLabel = "Save Employee",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form for edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        mobile: initialData.mobile || "",
        department: initialData.department || "",
        designation: initialData.designation || "",
        joiningDate: formatDateForInput(initialData.joiningDate) || "",
        status: initialData.status || "Active",
      });
    }
  }, [initialData]);

  // Update a single form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate all fields before submit
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidMobile(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.department) {
      newErrors.department = "Select a department";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!formData.status) {
      newErrors.status = "Select a status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="employee-form__grid">
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="e.g. john@company.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Mobile Number"
          id="mobile"
          name="mobile"
          placeholder="e.g. 9876543210"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          maxLength={10}
        />

        <Select
          label="Department"
          id="department"
          name="department"
          options={DEPARTMENTS}
          placeholder="Select Department"
          value={formData.department}
          onChange={handleChange}
          error={errors.department}
        />

        <Select
          label="Designation"
          id="designation"
          name="designation"
          options={DESIGNATIONS}
          placeholder="Select Designation"
          value={formData.designation}
          onChange={handleChange}
          error={errors.designation}
        />

        <Input
          label="Joining Date"
          id="joiningDate"
          name="joiningDate"
          type="date"
          value={formData.joiningDate}
          onChange={handleChange}
          error={errors.joiningDate}
        />

        <Select
          label="Status"
          id="status"
          name="status"
          options={STATUSES}
          placeholder="Select Status"
          value={formData.status}
          onChange={handleChange}
          error={errors.status}
        />
      </div>

      <div className="employee-form__actions">
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
