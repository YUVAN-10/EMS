import "./StatCard.css";

/**
 * Dashboard stat card.
 * Displays a count with a label and icon.
 *
 * Props:
 *   title — label text (e.g. "Total Employees")
 *   count — numeric value
 *   icon  — React icon element
 *   color — "orange" | "green" | "gray" (controls accent color)
 */
const StatCard = ({ title, count, icon, color = "orange" }) => {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon-wrapper">
        {icon}
      </div>
      <div className="stat-card__info">
        <p className="stat-card__count">{count}</p>
        <p className="stat-card__title">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
