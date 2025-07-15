import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Optional: Your custom styles

const Login = () => {
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
        "https://sms-backend-m58q.onrender.com/api/users/login", // Adjust if your backend path is different
        trimmedData
      );
  
      const { token, message, user } = response.data;
  
      if (token) {
        // ✅ Store token in localStorage
        localStorage.setItem("adminToken", token);
  
        alert(message || "Login successful");
        console.log("Logged in user:", user);
  
        // ✅ Redirect to dashboard
        navigate("/admin");
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
        <center><h2> Admin Login</h2></center> 
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

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        </div>
        <div className="login-image">
        <div className="circle"></div>
      </div>
      </div>
      
  );
};

export default Login;
