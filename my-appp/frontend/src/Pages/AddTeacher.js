import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormStyles.css';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('https://sms-backend-m58q.onrender.com/api/teachers');
      setTeachers(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Error fetching teachers.');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://sms-backend-m58q.onrender.com/api/teachers/add', formData);
      if (res.status === 201) {
        alert(`✅ Teacher added successfully: ${formData.name}`);
        setFormData({ name: '', subject: '', email: '' });
        fetchTeachers();
      }
    } catch (err) {
      console.error('❌ Error adding teacher:', err);
      alert('Error adding teacher. Please try again.');
    }
  };

  const handleDeleteTeacher = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmed) return; // User clicked "Cancel"
  
    try {
      const res = await axios.delete(`https://sms-backend-m58q.onrender.com/api/teachers/${id}`);
      if (res.status === 200) {
        alert('✅ Teacher deleted successfully');
        fetchTeachers();
      }
    } catch (err) {
      console.error('❌ Error deleting teacher:', err);
      alert('Error deleting teacher.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Teacher's Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Teacher</button>
      </form>

      <div className="teacher-list">
        <h3>Teacher List</h3>
        {error && <p className="error">{error}</p>}
        {teachers.length > 0 ? (
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                {teacher.name} ({teacher.subject}) - {teacher.email}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTeacher(teacher._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No teachers available.</p>
        )}
      </div>
    </div>
  );
};

export default AddTeacher;
