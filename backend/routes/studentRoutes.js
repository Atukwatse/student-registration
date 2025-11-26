const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { sendRegistrationEmail, sendApprovalEmail, sendRejectionEmail } = require('../services/emailService');

// --- Admin Login Route ---
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Define admin user credentials
  const adminUser = { username: "Blessing", password: "12345", role: "admin" };

  // Check if admin user matches the credentials
  let authenticatedUser = null;
  if (username === adminUser.username && password === adminUser.password) {
    authenticatedUser = adminUser;
  }

  if (authenticatedUser) {
    res.json({ 
      success: true, 
      message: "Login successful",
      role: authenticatedUser.role
    });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

// --- Student CRUD Routes ---

// Create a new student
router.post('/students', async (req, res) => {
  try {
    // Log incoming data for debugging
    console.log('Incoming student data:', req.body);
    
    // Validate required fields
    const { name, regNo, course, email, phone } = req.body;
    
    console.log('Validating fields:', { name, regNo, course, email, phone });
    
    if (!name || !regNo || !course || !email || !phone) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('Email regex test result:', emailRegex.test(email));
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }
    
    // Validate phone number (simple validation for at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    console.log('Phone validation:', { original: phone, cleaned: cleanPhone, regexTest: phoneRegex.test(cleanPhone) });
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ 
        message: 'Please provide a valid phone number with at least 10 digits' 
      });
    }

    const student = new Student(req.body);
    await student.save();
    
    // Send registration confirmation email
    try {
      await sendRegistrationEmail(student);
    } catch (emailError) {
      console.error('Failed to send registration email:', emailError);
      // Don't fail the registration if email fails
    }
    
    res.status(201).json(student);
  } catch (error) {
    // Handle duplicate registration number
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Registration number already exists' 
      });
    }
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a student
router.put('/students/:id', async (req, res) => {
  try {
    const { name, regNo, course, email, phone } = req.body;
    
    // Validate required fields
    if (!name || !regNo || !course || !email || !phone) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }
    
    // Validate phone number (simple validation for at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      return res.status(400).json({ 
        message: 'Please provide a valid phone number with at least 10 digits' 
      });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    // Handle duplicate registration number
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Registration number already exists' 
      });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve a student
router.put('/students/:id/approve', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      { status: 'approved' }, 
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Send approval email
    try {
      await sendApprovalEmail(student);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
      // Don't fail the approval if email fails
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject a student
router.put('/students/:id/reject', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      { status: 'rejected' }, 
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;