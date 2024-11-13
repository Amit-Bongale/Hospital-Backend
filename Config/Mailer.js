const nodemailer = require('nodemailer');

// Set up the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with transporter:', error);
  } else {
    console.log('Server is ready to send emails:', success);
  }
});

module.exports = transporter;
