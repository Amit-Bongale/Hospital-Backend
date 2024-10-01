const express = require('express')
const router = express.Router()

const Admininfo = require('../Models/Admin/Admininfo')

router.post('/create' , async (req, res) => {
    try {
        const admin = await Admininfo.create({
            'id': 'A003',
            'name': 'apoorva',
            'email': 'abcd@gmail.com',
            'password': 'a@123',
            'phone': 1234567890,
            'address': 'xyz'
        });
        res.json(admin);
        console.log('Inserted:', admin);
    } catch (error) {
        console.error("Insertion Error:", error); // Log full error
        res.status(500).json({ message: 'Error inserting admin', error: error.message });
    }
})



module.exports = router