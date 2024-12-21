const transporter = require('../Config/Mailer')

const sendWelcomeEmail = async (patientemail, patientname , id , password) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: patientemail,               
      subject : 'Welcome',                      // Email subject
      text: `Hi ${patientname},

Welcome to our City General Hospital! We are here to ensure your health and well-being.

Your Patient ID: ${id}
Password: ${password}

You can use these credentials to log in to your account on our website.

*Note: Please do not share these details with anyone.
To change your password, please log in to your account.*

Thank you,`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendAppointmentRejectionEmail = async (patientemail, patientname, appointmentDate, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: patientemail,               
    subject: 'Appointment Update', // Email subject
    text: `Hi ${patientname},

We regret to inform you that your appointment scheduled on ${appointmentDate} could not be approved at this time.

Reason: ${reason}

We apologize for any inconvenience this may have caused. Please feel free to reach out to us or reschedule your appointment by logging into your account on our website.

Thank you for your understanding.

Best regards,
City General Hospital`,
  };

  try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Rejection email sent:', info.response);
  } catch (error) {
      console.error('Error sending rejection email:', error);
  }
};


const sendAppointmentApprovalEmail = async (patientemail, patientname, appointmentDate, doctorName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: patientemail,               
    subject: 'Appointment Approved', // Email subject
    text: `Hi ${patientname},

We are pleased to inform you that your appointment scheduled on ${appointmentDate} with Dr. ${doctorName} has been approved.

Please ensure to arrive on time and bring any necessary documents for the consultation.

If you have any questions feel free to contact us or log in to your account on our website.

Thank you for choosing our hospital.

Best regards,  
City General Hospital`,
};
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Rejection email sent:', info.response);
  } catch (error) {
    console.error('Error sending rejection email:', error);
  }
}


module.exports = {sendWelcomeEmail , sendAppointmentRejectionEmail, sendAppointmentApprovalEmail};