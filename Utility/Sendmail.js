const transporter = require('../Config/Mailer')

const sendWelcomeEmail = async (patientemail, patientname , id , password) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: patientemail,               
      subject : 'Welcome',                      // Email subject
      text: `Hi ${patientname},

Welcome to our Hospital! We are here to ensure your health and well-being.

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
  

module.exports = {sendWelcomeEmail};