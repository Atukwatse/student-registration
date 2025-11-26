const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

const sendRegistrationEmail = async (student) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Student Registration Confirmation',
      html: `
        <h2>Student Registration Confirmation</h2>
        <p>Dear ${student.name},</p>
        <p>Your registration has been successfully submitted with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${student.name}</li>
          <li><strong>Registration Number:</strong> ${student.regNo}</li>
          <li><strong>Course:</strong> ${student.course}</li>
          <li><strong>Email:</strong> ${student.email}</li>
          <li><strong>Phone:</strong> ${student.phone}</li>
        </ul>
        <p>Your registration is currently pending approval. You will receive another email once your registration is approved.</p>
        <p>Thank you for registering!</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Registration email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
};

const sendApprovalEmail = async (student) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Registration Approved',
      html: `
        <h2>Registration Approved</h2>
        <p>Congratulations ${student.name}!</p>
        <p>Your registration for the course <strong>${student.course}</strong> has been approved.</p>
        <p>Registration Details:</p>
        <ul>
          <li><strong>Name:</strong> ${student.name}</li>
          <li><strong>Registration Number:</strong> ${student.regNo}</li>
          <li><strong>Course:</strong> ${student.course}</li>
        </ul>
        <p>You are now officially enrolled in the course.</p>
        <p>Best regards,<br>The Registration Team</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Approval email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending approval email:', error);
    throw error;
  }
};

const sendRejectionEmail = async (student) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Registration Status Update',
      html: `
        <h2>Registration Update</h2>
        <p>Dear ${student.name},</p>
        <p>We regret to inform you that your registration for the course <strong>${student.course}</strong> has been rejected.</p>
        <p>Registration Details:</p>
        <ul>
          <li><strong>Name:</strong> ${student.name}</li>
          <li><strong>Registration Number:</strong> ${student.regNo}</li>
          <li><strong>Course:</strong> ${student.course}</li>
        </ul>
        <p>If you believe this is an error, please contact the administration for further assistance.</p>
        <p>Best regards,<br>The Registration Team</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Rejection email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending rejection email:', error);
    throw error;
  }
};

module.exports = {
  sendRegistrationEmail,
  sendApprovalEmail,
  sendRejectionEmail
};