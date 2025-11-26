import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const ParentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if parent is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (!isLoggedIn || userRole !== 'parent') {
      navigate('/');
    } else {
      fetchStudents();
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (loading) {
    return <div className="App"><h2>Loading students...</h2></div>;
  }

  return (
    <div className="App">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      {error && <p className="error">{error}</p>}
      
      <h2>Your Children's Information</h2>
      <p>As a parent, you can view your children's registration status and details.</p>
      
      {students.length === 0 ? (
        <p>No student records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg No</th>
              <th>Course</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                <td className={`status-${student.status}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParentDashboard;