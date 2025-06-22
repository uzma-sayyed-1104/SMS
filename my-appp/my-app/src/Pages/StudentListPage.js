import React, { useEffect, useState } from "react";
import './StudentListPage.css';  // Import the CSS file

const StudentListPage = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.className}</td>
                <td>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentListPage;
