// src/components/ForgotPassword.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css"; // Reuse existing styles or create a new one

const ForgotPassword = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a reset link</p>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
          <button className="login-btn">Send Reset Link</button>
        </form>
        <p className="signup">
          Remembered? <Link to="/login">Go back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
