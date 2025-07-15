import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const AddComplaint = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    studentName: ''
  });

  const [complaints, setComplaints] = useState([]);

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/complaints');
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/complaints/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaint)
      });

      if (res.ok) {
        alert('Complaint submitted successfully!');
        setComplaint({ title: '', description: '', studentName: '' });
        fetchComplaints();
      } else {
        const data = await res.json();
        alert('Failed to submit complaint: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const res = await fetch(`https://sms-backend-m58q.onrender.com/api/complaints/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert('Complaint deleted');
          fetchComplaints();
        } else {
          alert('Error deleting complaint');
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="form-container">
      <h2>Add Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Your Name"
          value={complaint.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={complaint.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Complaint Description"
          value={complaint.description}
          onChange={handleChange}
          rows="4"
          required
        />
        <button type="submit">Submit Complaint</button>
      </form>

      <div className="list-container">
        <h3>Complaint List</h3>
        {complaints.map((c) => (
          <div key={c._id} className="list-item">
            <p><strong>{c.studentName}</strong> - {c.title}</p>
            <p>{c.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddComplaint;
