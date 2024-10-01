const express = require('express')
const router = express.Router()
const Patientinfo = require('../Models/Patient/Patientinfo')

router.post('/createpatient', async (req, res)=>{
    try {
        const patient = await Patientinfo.create({
        'id' : 'P001',
        'name' : 'pavan',
        'gender' : 'Male',
        'email' : 'ret@gmail.com',
        'password' : 'pa123',
        'dob' : 12-6-1947,
        'age' : 77,
        'phone' : 5432178969,
        'emergencycontact' : 9876543219,
        'address' : 'abc',
        'bloodgroup' : 'B+ve',
        'adharno' : 876908453,
        'medicalhistory' : 'Skin Disease'
        
    });
    res.json(patient);
    console.log('Inserted:', patient);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting patient', error: error.message });
        
    }
})

module.exports = router