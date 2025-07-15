import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const ClassesPage = () => {
  const [className, setClassName] = useState('');
  const [classCount, setClassCount] = useState(0);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    fetchClassCount();
    fetchClassList();
  }, []);

  const fetchClassCount = async () => {
    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/classes/count');
      const data = await res.json();
      setClassCount(data.count);
    } catch (error) {
      console.error('Failed to fetch class count:', error);
    }
  };

  const fetchClassList = async () => {
    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/classes');
      const data = await res.json();
      setClassList(data);
    } catch (error) {
      console.error('Failed to fetch class list:', error);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();

    const newClass = {
      name: className.trim(),
    };

    try {
      const response = await fetch('https://sms-backend-m58q.onrender.com/api/classes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        alert('Class added successfully!');
        setClassName('');
        fetchClassCount();
        fetchClassList();
      } else {
        alert('Failed to add class');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding class');
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      const response = await fetch(`https://sms-backend-m58q.onrender.com/api/classes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Class deleted successfully!');
        fetchClassCount();
        fetchClassList();
      } else {
        alert('Failed to delete class');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting class');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Class</h2>
      <form onSubmit={handleAddClass}>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name"
          required
        />
        <button type="submit">Add Class</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Total Classes: {classCount}</h3>
      </div>

      <div className="class-list">
        <h3>Class List</h3>
        {classList.length > 0 ? (
          <ul>
            {classList.map((cls) => (
              <li key={cls._id}>
                {cls.name}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClass(cls._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No classes available.</p>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
