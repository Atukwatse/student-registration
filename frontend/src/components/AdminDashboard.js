import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (!isLoggedIn || userRole !== 'admin') {
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

  const handleApprove = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'approve' }));
    try {
      const res = await fetch(`http://localhost:5000/api/students/students/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setMessage('Student approved successfully!');
        fetchStudents(); // Refresh the list
      } else {
        setError('Failed to approve student');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newLoading = { ...prev };
        delete newLoading[id];
        return newLoading;
      });
    }
  };

  const handleReject = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'reject' }));
    try {
      const res = await fetch(`http://localhost:5000/api/students/students/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setMessage('Student rejected successfully!');
        fetchStudents(); // Refresh the list
      } else {
        setError('Failed to reject student');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newLoading = { ...prev };
        delete newLoading[id];
        return newLoading;
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setActionLoading(prev => ({ ...prev, [id]: 'delete' }));
      try {
        const res = await fetch(`http://localhost:5000/api/students/students/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setMessage('Student deleted successfully!');
          fetchStudents(); // Refresh the list
        } else {
          setError('Failed to delete student');
        }
      } catch (err) {
        setError('Server error. Please try again.');
      } finally {
        setActionLoading(prev => {
          const newLoading = { ...prev };
          delete newLoading[id];
          return newLoading;
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
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
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <a href="/students" className="nav-link">Register New Student</a>
      
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      
      <h2>Student Management</h2>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td className={`status-${student.status}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </td>
                <td>
                  {student.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(student._id)} className="approve">
                        {actionLoading[student._id] === 'approve' ? 'Approving...' : 'Approve'}
                      </button>
                      <button onClick={() => handleReject(student._id)} className="reject">
                        {actionLoading[student._id] === 'reject' ? 'Rejecting...' : 'Reject'}
                      </button>
                    </>
                  )}
                  <button onClick={() => handleEdit(student._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student._id)} className="delete">
                    {actionLoading[student._id] === 'delete' ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;