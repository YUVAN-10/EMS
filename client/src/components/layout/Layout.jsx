import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

/**
 * Main layout wrapper.
 * Renders Sidebar + Header + main content area.
 * All page components are rendered inside this layout.
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="layout__main">
        <Header onMenuToggle={toggleSidebar} />
        <main className="layout__content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
