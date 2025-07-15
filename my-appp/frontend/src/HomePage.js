import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // CSS file for styles
import studentImage from "./Images/student.jpg"; // Add your image in src folder

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="left-section" style={{ backgroundImage: `url(${studentImage})` }}></div>
      <div className="right-section">
        <h1>Student Management System</h1>
        <p>
          Welcome to the Student Management System. Manage student records efficiently and effectively.
        </p>
        <button className="login-btn"onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
