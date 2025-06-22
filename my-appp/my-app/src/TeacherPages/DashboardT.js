import React, { useState, useEffect } from 'react';
import Home from './Home';
import Class from './class';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    classStudents: [],
    totalLessons: 0,
    testsTaken: 0,
    totalHours: 0,
    notices: [],
  });

  const fetchDashboardData = () => {
    fetch('http://localhost:5000/api/teacherHomeRoute/dashboard')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setDashboardData(data);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Home dashboardData={dashboardData} />
      <Class onClassAdded={fetchDashboardData} />
    </div>
  );
};

export default Dashboard;
