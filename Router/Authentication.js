const express = require('express')
const router = express.Router()
const Patient = require('../Models/Patientinfo')
const Doctor = require('../Models/Doctorinfo')
const Staff = require('../Models/Staffinfo')
const Admin = require('../Models/Admininfo')
const { hashPassword , comparePassword } = require('../Utility/bcrypt')

const jwt = require('jsonwebtoken')
const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

router.post('/adminlogin', async (req, res) => {

    const { id, password } = req.body;

    try {
        // Check if the user exists
        const user = await Admin.findOne({'id' : id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account Does not Exist' });
        }

        // Check if the password matches
        const isMatch = await comparePassword( password, user.password );
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        // update staff status to active
        await Admin.updateOne({ 'id' : id }, { 'status': true });

        // Generate JWT token
        const token = jwt.sign({ id: user.id , name: user.name, role:"admin"}, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.cookie("token" , token)

        // Respond with success message
        res.status(200).json({ success: true, message: 'Login successful',
            user: { 
                id: user.id, 
                name: user.name,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



router.post('/doctorlogin', async (req, res) => {

    const { id, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await Doctor.findOne({'id' : id });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Account Does not Exist' });
      }
      
      console.log(user)
  
      const isMatch = await comparePassword( password, user.password );
      if (!isMatch) {
        return res.status(401).send({ error: 'Invalid password.' });
      }
  
      await Doctor.updateOne({ 'id' : id }, { 'status': true });

      // Genreate and set JWT token
      const token = jwt.sign({ id: user.id , name: user.name, role:"doctor"}, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.cookie("token" , token)
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'Login successful',
        user: { 
          id: user.id, 
          name: user.name,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
});



router.post('/stafflogin', async (req, res) => {

    const { id, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await Staff.findOne({'id' : id });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Account Does not Exist' });
      }
      
      console.log(user)
      // Check if the password matches
      const isMatch = await comparePassword( password, user.password );
      if (!isMatch) {
        return res.status(401).send({ error: 'Invalid password.' });
      }
      console.log(isMatch);
  
      // update staff status to active
      await Staff.updateOne({ 'id' : id }, { 'status': true });
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'Login successful',
        user: { 
          id: user.id, 
          name: user.name,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
});



router.post('/patientlogin', async (req, res) => {

    const { id, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await Patient.findOne({'id' : id });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Account Does not Exist' });
      }
      // console.log(user)
  
      // Check if the password matches
      const isMatch = await comparePassword( password, user.password );
      if (!isMatch) {
        return res.status(401).send({ error: 'Invalid password.' });
      }
      console.log(isMatch)
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'Login successful',
        user: { 
          id: user.id, 
          name: user.name,
          // You can include other user details as needed
        }
      });
      
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
});
  

module.exports = router;