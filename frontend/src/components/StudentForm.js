import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate form fields
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!regNo.trim()) {
      setError('Registration number is required');
      return;
    }
    
    if (!course.trim()) {
      setError('Course is required');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate phone number (simple validation for at least 10 digits)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone.trim() || phoneDigits.length < 10) {
      setError('Please enter a valid phone number with at least 10 digits');
      return;
    }

    const newStudent = { name, regNo, course, email, phone };

    try {
      const response = await fetch('http://localhost:5000/api/students/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Student registered successfully! Pending admin approval.');
        // Clear form
        setName('');
        setRegNo('');
        setCourse('');
        setEmail('');
        setPhone('');
      } else {
        setError(data.message || 'Failed to register student');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  return (
    <div className="App">
      <h1>Student Registration System</h1>
      <h2>Register New Student</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9\\s\\-\\(\\)]{10,}"
          title="Phone number must contain at least 10 digits"
          required
        />
        <button type="submit">Register Student</button>
        <a href="/student-list" className="nav-link">View All Students</a>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default StudentForm;