const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWelcomeMessage = (patientname, customerPhoneNumber, id , password) => {
  return client.messages.create({
    body: `Hi ${patientname},

Welcome to our Hospital! We are here to ensure your health and well-being.

Your Patient ID: ${id}
Password: ${password}

You can use these credentials to log in to your account on our website.

*Note: Please do not share these details with anyone.
To change your password, please log in to your account.*

Thank you,`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+91' + customerPhoneNumber,
  });
};

module.exports = { sendWelcomeMessage };
