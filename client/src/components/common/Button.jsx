import "./Button.css";

/**
 * Reusable Button component.
 *
 * Props:
 *   variant  — "primary" | "secondary" | "danger" | "ghost" (default: "primary")
 *   size     — "sm" | "md" | "lg" (default: "md")
 *   loading  — shows spinner when true
 *   icon     — optional icon element to render before text
 *   children — button label text
 *   ...rest  — any native button props (onClick, type, disabled, etc.)
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon = null,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${loading ? "btn--loading" : ""} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <span className="btn__spinner" />
      ) : (
        <>
          {icon && <span className="btn__icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
