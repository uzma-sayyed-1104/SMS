// src/components/AdminLogin.jsx
import React from "react";
import { Link } from "react-router-dom";  // <-- Add this
import "./LoginForm.css";

const AdminLogin = () => {
  return (
    <div className="login-container">
      <div className="login-form">
       <center><h2>A Student Login</h2></center> 
        <p>Welcome back! Please enter your details</p>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Password" required />

          <div className="options">
            <label><input type="checkbox" /> Remember me</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn">Login</button>
       
        </form>

        <p className="signup">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <div className="login-image">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
