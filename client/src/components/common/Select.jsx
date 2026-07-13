import "./Select.css";

/**
 * Reusable Select dropdown component.
 *
 * Props:
 *   label     — select label text
 *   error     — error message string
 *   id        — unique id
 *   options   — array of option strings (e.g. ["Engineering", "Marketing"])
 *   placeholder — placeholder text for the default empty option
 *   ...rest   — native select props (value, onChange, etc.)
 */
const Select = ({ label, error, id, options = [], placeholder = "Select...", className = "", ...rest }) => {
  return (
    <div className={`select-group ${error ? "select-group--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="select-group__label">
          {label}
        </label>
      )}
      <select id={id} className="select-group__select" {...rest}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="select-group__error">{error}</span>}
    </div>
  );
};

export default Select;
