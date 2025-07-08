import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const AddSubject = () => {
  const [subject, setSubject] = useState({
    subjectName: '',
    subjectCode: ''
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/subjects');
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/subjects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subject)
      });

      if (res.ok) {
        alert('Subject added successfully!');
        setSubject({ subjectName: '', subjectCode: '' });
        fetchSubjects();
      } else {
        const data = await res.json();
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error('Error adding subject:', err);
      alert('Server error.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/subjects/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Subject deleted successfully!');
        fetchSubjects();
      } else {
        const data = await res.json();
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error('Error deleting subject:', err);
      alert('Server error.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Subject</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subjectName"
          placeholder="Subject Name"
          value={subject.subjectName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="subjectCode"
          placeholder="Subject Code"
          value={subject.subjectCode}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Subject</button>
      </form>

      <div className="class-list">
        <h3>Subject List</h3>
        {subjects.length > 0 ? (
          <ul>
            {subjects.map((subj) => (
              <li key={subj._id}>
                {subj.subjectName} ({subj.subjectCode})
                <button
                  className="delete-button"
                  onClick={() => handleDelete(subj._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No subjects available.</p>
        )}
      </div>
    </div>
  );
};

export default AddSubject;
