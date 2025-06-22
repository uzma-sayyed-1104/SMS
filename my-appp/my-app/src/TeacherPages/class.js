import React, { useEffect, useState } from 'react';
import './class.css';

const Class = ({ onClassAdded }) => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    totalStudents: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/teacherClassRoute')
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error('Error fetching classes:', err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/teacherClassRoute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Class added successfully!');
        setClasses((prevClasses) => {
          const classIndex = prevClasses.findIndex((cls) => cls.className === data.className);
          return classIndex !== -1
            ? prevClasses.map((cls, idx) => (idx === classIndex ? data : cls))
            : [...prevClasses, data];
        });

        setFormData({ className: '', subject: '', totalStudents: '' });

        onClassAdded(); // 🔄 Trigger Home.js to refresh data
      })
      .catch((err) => console.error('Error adding class:', err));
  };

  return (
    <div className="class-container">
      <h2>Manage Classes</h2>

      <form className="class-form" onSubmit={handleSubmit}>
        <label>Class Name:</label>
        <input type="text" name="className" value={formData.className} onChange={handleChange} required />

        <label>Subject:</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

        <label>Total Students:</label>
        <input type="number" name="totalStudents" value={formData.totalStudents} onChange={handleChange} required />

        <button type="submit">Add Class</button>
      </form>

      <h3>Existing Classes</h3>
      <ul className="class-list">
        {classes.map((cls, index) => (
          <li key={index}>
            <strong>{cls.className}</strong> - {cls.subject} ({cls.totalStudents} students)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Class;
