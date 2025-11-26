import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const TeacherLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the Java backend for teacher login
      const res = await fetch('http://localhost:8080/api/teachers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response is OK (status in the range 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // Store login status and role in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', data.role);
        // Redirect to teacher dashboard
        navigate('/teacher-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err); // Log the actual error for debugging
      if (err.name === 'TypeError') {
        setError('Network error. Please make sure the Java server is running.');
      } else {
        setError(`Server error: ${err.message}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="dashboard-header">
        <h1>Teacher Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      
      <div className="login-info">
        <h3>Login Information</h3>
        <p>Username: teacher</p>
        <p>Password: teacher123</p>
      </div>
    </div>
  );
};

export default TeacherLogin;