import "./Input.css";

/**
 * Reusable Input component with label and error message support.
 *
 * Props:
 *   label       — input label text
 *   error       — error message string (shows red when truthy)
 *   id          — unique input id (required for accessibility)
 *   ...rest     — any native input props (type, value, onChange, placeholder, etc.)
 */
const Input = ({ label, error, id, className = "", ...rest }) => {
  return (
    <div className={`input-group ${error ? "input-group--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="input-group__label">
          {label}
        </label>
      )}
      <input id={id} className="input-group__input" {...rest} />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
};

export default Input;
