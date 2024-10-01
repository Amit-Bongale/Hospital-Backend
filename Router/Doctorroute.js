const express = require('express')
const router = express.Router()
const Doctorinfo = require('../Models/Doctor/Doctorinfo')

router.post('/createdoctor', async (req, res)=>{
    try {
        const doctor = await Doctorinfo.create({
            'id': 'D003',
            'name': 'Rakshita',
            'gender' : 'Female',
            'email': 'abcd@gmail.com',
            'password': 'a@123',
            'specialization' : 'Cardiologist',
            'phone': 1234567890,
            'experience' : 1,
            'dob': 5-10-2005,
        
    });
    res.json(doctor);
    console.log('Inserted:', doctor);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting doctor', error: error.message });
        
    }
})

module.exports = router