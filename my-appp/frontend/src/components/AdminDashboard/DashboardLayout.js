import React from "react";
import { Outlet } from "react-router-dom";

import "./Dashboard.css";
import Sidebar from "./Sidebar";  // Sidebar component

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Only render the Sidebar here, no need for the repeated menu */}
     

      <aside className="sidebar">
        <Sidebar />  {/* Ensure Sidebar contains the links, remove them from here */}
      </aside>

      <main className="dashboard-content">
        <Outlet /> {/* This will load the content of the specific page */}
      </main>
    </div>
  );
};

export default DashboardLayout;
