import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiUserPlus } from "react-icons/fi";
import "./Sidebar.css";

/**
 * Side navigation panel.
 * Premium white/orange theme with elegant active-state highlighting.
 * Collapsible on mobile via `isOpen` prop.
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: <FiGrid />, label: "Dashboard" },
    { to: "/employees", icon: <FiUsers />, label: "Employees" },
    { to: "/employees/add", icon: <FiUserPlus />, label: "Add Employee" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        {/* Logo / Brand */}
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <span className="sidebar__logo-icon">E</span>
          </div>
          <div>
            <h2 className="sidebar__title">EMS</h2>
            <p className="sidebar__subtitle">Employee Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <p className="sidebar__nav-label">MAIN MENU</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
              onClick={onClose}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__footer-card">
            <p className="sidebar__footer-title">Need Help?</p>
            <p className="sidebar__footer-text">Contact support team</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
