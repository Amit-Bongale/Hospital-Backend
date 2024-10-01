const express = require('express')
const router = express.Router()
const Doctorinfo = require('../Models/Doctor/Doctorinfo')

router.post('/createdoctor', async (req, res)=>{
    try {

        const { id, name, gender, email, password, specialization, phone, experience, dob } = req.body;

        const doctor = await Doctorinfo.create({
            'id': id,
            'name': name,
            'gender': gender,
            'email': email,
            'password': password,
            'specialization': specialization,
            'phone': phone,
            'experience': experience,
            'dob': new Date(dob),
        
        });
        res.status(200).json({ message: 'Doctor inserted successfully', doctor });
        console.log('Inserted:', doctor);
    }
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting doctor', error: error.message });
        
    }
})

module.exports = router