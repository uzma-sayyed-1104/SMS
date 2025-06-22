import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = ({ refreshTrigger }) => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/teacherHomeRoute/dashboard')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setDashboardData(data);
      })
      .catch((err) => {
        console.error('Error fetching dashboard data:', err);
        setDashboardData({
          classStudents: [],
          totalLessons: 0,
          testsTaken: 0,
          totalHours: 0,
          notices: [],
        });
      });
  }, [refreshTrigger]); // Ensures data refreshes when a new class is added

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <center>
        <h2>Teacher Dashboard Home</h2>
      </center>

      <div className="cards">
        {dashboardData.classStudents.map((cls, index) => (
          <div className="card" key={index}>
            <h3>Class: {cls.className}</h3>
            <p>Total Students: {cls.classStudents || 0}</p>
          </div>
        ))}

        <div className="card">
          <h3>Total Lessons</h3>
          <p>{dashboardData.totalLessons}</p>
        </div>
        <div className="card">
          <h3>Tests Taken</h3>
          <p>{dashboardData.testsTaken}</p>
        </div>
        <div className="card">
          <h3>Total Hours</h3>
          <p>{dashboardData.totalHours}</p>
        </div>
      </div>

      <div className="notice">
        <h3>Latest Notices</h3>
        {dashboardData.notices.length === 0 ? (
          <p>No notices at the moment.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dashboardData.notices.slice(0, 5).map((notice) => (
              <li
                key={notice._id}
                style={{
                  marginBottom: '15px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '10px',
                }}
              >
                <strong>{notice.title}</strong>
                <p>{notice.content}</p>
                <small>
                  Posted by: {notice.postedBy} |{' '}
                  {new Date(notice.date).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
