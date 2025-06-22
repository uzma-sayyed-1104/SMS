import React, { useEffect, useState } from 'react';
import './AdminProfile.css'; // Make sure this path matches your file location

const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setAdmin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Admin Profile</h2>

        {loading && <p>Loading profile...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Joined:</strong> {admin.joined ? new Date(admin.joined).toLocaleDateString() : "Not available"}</p>

          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
