const express = require('express')
const router = express.Router()

const Admininfo = require('../Models/Admin/Admininfo')

router.post('/create' , async (req, res) => {
    try {
        const { id, name, email, password, phone, address} = req.body;
        console.log(req.body)

        const admin = await Admininfo.create({
            'id': id,
            'name': name,
            'email': email,
            'password': password,
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



module.exports = router