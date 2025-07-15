import React, { useState } from "react";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";
import "./LoginForm.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("https://sms-backend-m58q.onrender.com/api/users/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      alert(response.data.message); // e.g., "User created successfully"
      console.log("User signed up:", response.data);
  
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
  
      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

          <button className="login-btn" type="submit">
            Sign Up
          </button>
        </form>

        <p className="signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="login-image">
      <div className="circle"></div>
      </div>
      </div>
  );
};

export default Signup;
