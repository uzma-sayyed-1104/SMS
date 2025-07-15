import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const AddNotice = () => {
  const [notice, setNotice] = useState({
    title: '',
    content: '',
    postedBy: ''
  });

  const [notices, setNotices] = useState([]);

  const handleChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/notices/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
      });

      if (res.ok) {
        alert('✅ Notice posted successfully!');
        setNotice({ title: '', content: '', postedBy: '' });
        fetchNotices();
      } else {
        const data = await res.json();
        alert('❌ Failed to post notice: ' + data.error);
      }
    } catch (error) {
      console.error('❌ Error posting notice:', error);
      alert('Server error. Please try again later.');
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await fetch('https://sms-backend-m58q.onrender.com/api/notices');
      const data = await res.json();
      setNotices(data.reverse());
    } catch (err) {
      console.error('Error fetching notices:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    try {
      const res = await fetch(`https://sms-backend-m58q.onrender.com/api/notices/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('🗑️ Notice deleted');
        fetchNotices();
      } else {
        alert('❌ Failed to delete notice');
      }
    } catch (err) {
      console.error('Error deleting notice:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="form-container">
      <h2>Add Notice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="postedBy"
          placeholder="Posted By"
          value={notice.postedBy}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={notice.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Notice Content"
          value={notice.content}
          onChange={handleChange}
          rows="4"
          required
        />
        <button type="submit">Post Notice</button>
      </form>

      <div className="notice-list">
        <h3>All Notices</h3>
        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          notices.map((n) => (
            <div key={n._id} className="notice-card">
              <h4>{n.title}</h4>
              <p>{n.content}</p>
              <small>Posted by: {n.postedBy}</small>
              <button className="delete-btn" onClick={() => handleDelete(n._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddNotice;
