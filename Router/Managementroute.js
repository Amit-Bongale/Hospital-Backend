const express = require('express')
const router = express.Router()
const Appointmentinfo = require('../Models/Management/Managementinfo')

router.post('/createappointment', async (req, res)=>{
    try {
        const { doctorid, doctorname, patientid, scheduleddate, scheduledtime, status, consultantfee} = req.body;
        console.log(req.body)

        const appointment = await Appointmentinfo.create({
        doctorid : doctorid,
        doctorname : doctorname,
        patientid : patientid,
        scheduleddate : scheduleddate, 
        scheduledtime : scheduledtime,
        status : status,
        consultantfee : consultantfee
        
    });
    res.status(200).json({ message: 'Patient appointment details inserted successfully', appointment }); 
    console.log('Inserted:', appointment);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting appointment details', error: error.message });
        
    }
})

module.exports = router