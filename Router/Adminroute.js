const express = require('express')
const router = express.Router()
const Admin = require('../Models/Admininfo')

const { hashPassword , comparePassword } = require('../Utility/bcrypt')

const jwt = require('jsonwebtoken')
const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')


router.post('/create' , VerifyToken, AuthorizedRoles("admin"), async (req, res) => {
    try {
        const { id, name, email, password, phone, address} = req.body;
        console.log(req.body)

        const hashedPassword = await hashPassword(password);

        const admin = await Admin.create({
            'id': id,
            'name': name,
            'email': email,
            'password': hashedPassword,
            'phone': phone,
            'address': address
        });
        res.status(200).json({ message: 'Admin inserted successfully', admin });
        console.log('Inserted:', admin);
    } 
    catch (error) {
        console.error("Insertion Error:", error); // Log full error
        res.status(500).json({ message: 'Error inserting admin', error: error.message });
    }
})


router.post('/login', async (req, res) => {

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
        res.cookie("token" , token, { httpOnly: true, expire : 24 * 60 * 60 * 1000, sameSite:"none" })

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



// set Doctor status inactive after logout
router.post('/logout', VerifyToken, AuthorizedRoles("admin"), async (req, res) => {
    const { id } = req.body;
    try {
        await Admin.updateOne({ 'id' : id }, { 'status': false });
        res.clearCookie("token"); // Clear the cookie
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



module.exports = router