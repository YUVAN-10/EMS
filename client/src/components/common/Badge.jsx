import "./Badge.css";

/**
 * Status badge component.
 * Shows "Active" in green or "Inactive" in gray.
 *
 * Props:
 *   status — "Active" | "Inactive"
 */
const Badge = ({ status }) => {
  const variant = status === "Active" ? "active" : "inactive";

  return (
    <span className={`badge badge--${variant}`}>
      <span className="badge__dot" />
      {status}
    </span>
  );
};

export default Badge;
