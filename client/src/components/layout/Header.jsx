import { useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./Header.css";

/**
 * Top header bar — premium design.
 * Shows the current page title and a menu toggle for mobile.
 */
const Header = ({ onMenuToggle }) => {
  const location = useLocation();

  // Map route paths to page titles
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/employees") return "Employees";
    if (path === "/employees/add") return "Add Employee";
    if (path.startsWith("/employees/edit")) return "Edit Employee";
    return "Page";
  };

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <FiMenu />
        </button>
        <div>
          <h1 className="header__title">{getPageTitle()}</h1>
          <p className="header__breadcrumb">
            Home <span className="header__breadcrumb-sep">/</span> <span className="header__breadcrumb-current">{getPageTitle()}</span>
          </p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__avatar">
          <span>A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
