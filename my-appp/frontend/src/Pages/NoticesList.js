import React, { useEffect, useState } from 'react';
import './FormStyles.css';

const NoticesList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('https://sms-backend-m58q.onrender.com/api/notices');
          const data = await res.json();
          console.log("Fetched Notices:", data);
          setNotices(data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="form-container">
      <h2>Latest Notices</h2>
      {notices.length === 0 ? (
        <p>No notices posted yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notices.map((notice) => (
            <li key={notice._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <small>Posted by: {notice.postedBy} | {new Date(notice.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticesList;
