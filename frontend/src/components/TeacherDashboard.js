import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if teacher is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (!isLoggedIn || userRole !== 'teacher') {
      navigate('/');
    } else {
      fetchStudents();
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      // Call the Java backend to get students
      const res = await fetch('http://localhost:8080/api/teachers/students');
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students from Java backend');
      console.error('Error fetching students:', err);
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
    return <div className="App"><h2>Loading students from Java backend...</h2></div>;
  }

  return (
    <div className="App">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      {error && <p className="error">{error}</p>}
      
      <h2>Student List</h2>
      <p>As a teacher, you can view all students and their details.</p>
      
      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg No</th>
              <th>Course</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id || student._id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td className={`status-${student.status || 'pending'}`}>
                  {student.status ? student.status.charAt(0).toUpperCase() + student.status.slice(1) : 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherDashboard;