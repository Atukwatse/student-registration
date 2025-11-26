import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import AdminDashboard from './components/AdminDashboard';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './components/TeacherDashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;