const express = require('express')
const router = express.Router()
const Appointmentinfo = require('../Models/Management/Managementinfo')

router.post('/createappointment', async (req, res)=>{
    try {
        const appointment = await Appointmentinfo.create({
        'doctorid' : 'D003',
        'doctorname' : 'Danesh',
        'patientid' : 'P009',
        'scheduleddate' : 23-9-2024, 
        'Scheduledtime' : '12:3:54',
        'Status' : 'Accept',
        'Consultantfee' : 500
        
    });
    res.json(appointment);
    console.log('Inserted:', appointment);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting patient appointment details', error: error.message });
        
    }
})

module.exports = router