// src/pages/AddStudent.js
import React, { useState } from 'react';
import './FormStyles.css';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({ name: '', roll: '', className: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/students/add', formData);

      if (response.status === 201) {
        alert(`Student "${formData.name}" added successfully!`);
        setFormData({ name: '', roll: '', className: '' }); // reset form
        window.dispatchEvent(new Event("studentAdded"));
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} required />
        <input name="roll" placeholder="Roll Number" value={formData.roll} onChange={handleChange} required />
        <input name="className" placeholder="Class" value={formData.className} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
