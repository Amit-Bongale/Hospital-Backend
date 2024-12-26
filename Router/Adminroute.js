const express = require('express')
const router = express.Router()

const Admin = require('../Models/Admininfo')

const { hashPassword , comparePassword } = require('../Utility/bcrypt')


router.post('/create' , async (req, res) => {
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
        console.log(user)

        // Check if the password matches
        const isMatch = await comparePassword( password, user.password );
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid password.' });
        }
        console.log(isMatch);

        // update staff status to active
        await Admin.updateOne({ 'id' : id }, { 'status': true });

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
router.post('/logout', async (req, res) => {
    const { id } = req.body;
    try {
        await Admin.updateOne({ 'id' : id }, { 'status': false });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



module.exports = router