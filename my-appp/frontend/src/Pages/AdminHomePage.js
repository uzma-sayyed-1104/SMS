import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    defaultFees: 0,
  });

  const [notices, setNotices] = useState([]);

  // Fetch dashboard counts
  const fetchCounts = () => {
    fetch("http://localhost:5000/api/dashboard/counts")
      .then(res => res.json())
      .then(data => setCounts(data))
      .catch(err => console.error("Error fetching dashboard data:", err));
  };

  // Fetch notices
  const fetchNotices = () => {
    fetch("http://localhost:5000/api/notices")
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error("Error fetching notices:", err));
  };

  useEffect(() => {
    fetchCounts();
    fetchNotices();

    const handleStudentAdded = () => {
      fetchCounts();
    };

    window.addEventListener("studentAdded", handleStudentAdded);

    return () => {
      window.removeEventListener("studentAdded", handleStudentAdded);
    };
  }, []);

  return (
    <div className="container">
      <center><h2>Admin Dashboard - Home</h2></center>
      
      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{counts.students}</p>
        </div>
        <div className="card">
          <h3>Total Classes</h3>
          <p>{counts.classes}</p>
        </div>
        <div className="card">
          <h3>Total Teachers</h3>
          <p>{counts.teachers}</p>
        </div>
        <div className="card">
          <h3>Default Fees</h3>
          <p>₹{counts.defaultFees}</p>
        </div>
      </div>

      <div className="notice">
        <h3>Latest Notices</h3>
        {notices.length === 0 ? (
          <p>No notices at the moment.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {notices.slice(0, 5).map((notice) => (
              <li key={notice._id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <strong>{notice.title}</strong>
                <p>{notice.content}</p>
                <small>Posted by: {notice.postedBy} | {new Date(notice.date).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
