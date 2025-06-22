// src/components/TeacherLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";



const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/teacherlogin/login", // Adjust if your backend path is different
        trimmedData
      );
  
      const { token, message, user } = response.data;
  
      if (token) {
        // ✅ Store token in localStorage
        localStorage.setItem("adminToken", token);
  
        alert(message || "Login successful");
        console.log("Logged in user:", user);
  
        // ✅ Redirect to dashboard
        navigate("/Teacher");
      } else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <center><h2>Teacher Login</h2></center>
        <p>Welcome back! Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
             autoComplete="current-password"
          />

          <div className="options">
            <label><input type="checkbox" /> Remember me</label>
           <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn">Login</button>
          
        </form>

        <p className="signup">
          Don’t have an account? <Link to="/teachersignup">Sign up</Link>
        </p>
      </div>

      <div className="login-image">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default TeacherLogin;
