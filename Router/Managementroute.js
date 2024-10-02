const express = require('express')
const router = express.Router()
const Appointmentinfo = require('../Models/Management/Managementinfo')

router.post('/createapointment', async (req, res)=>{
    try {
        const appointment = await Appointmentinfo.create({
        'id' : 'S001',
        'name' : 'preethi',
        'gender' : 'Female',
        'dob' : 3-4-2003,
        'age' : 21,
        'email' : 'pre@gmail.com',
        'phone' : 7654389623,
        'password' : 'prn123'
        
    });
    res.json(appointment);
    console.log('Inserted:', appointment);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting appointment', error: error.message });
        
    }
})

module.exports = router