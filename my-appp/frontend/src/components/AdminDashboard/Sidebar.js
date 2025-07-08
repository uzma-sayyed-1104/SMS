import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); // or sessionStorage.clear();
    setShowModal(false);
    navigate("/"); // Navigate to role selection or login page
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          ☰
        </div>
        <nav>
          <NavLink to="/admin" end>
            🏠 <span className="label">Home</span>
          </NavLink>
          <NavLink to="/admin/classes">
            🏫 <span className="label">Classes</span>
          </NavLink>
          <NavLink to="/admin/subjects">
            📘 <span className="label">Subjects</span>
          </NavLink>
          <NavLink to="/admin/teachers">
            👩‍🏫 <span className="label">Teachers</span>
          </NavLink>
          <NavLink to="/admin/students">
            🎓 <span className="label">Students</span>
          </NavLink>
          <NavLink to="/admin/students/view">
          📋 <span className="label">View Students</span>
           </NavLink>
            <NavLink to="/admin/notices">
            📢 <span className="label">Notices</span>
          </NavLink>
          <NavLink to="/admin/complaints">
            😡 <span className="label">Complaints</span>
          </NavLink>
          <hr />
          <NavLink to="/admin/profile">
            👤 <span className="label">Profile</span>
          </NavLink>
          <div className="logout-link" onClick={() => setShowModal(true)}>
            🔓 <span className="label">Logout</span>
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="btn cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
