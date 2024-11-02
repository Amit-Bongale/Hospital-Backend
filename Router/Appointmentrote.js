const express = require('express')
const router = express.Router()
const Appointment = require('../Models/Appointment')

router.post('/createappointment', async (req, res)=>{
    try {
        const { doctorid, doctorname, doctorspecialization,  patientid, scheduleddate, scheduledtime, type, disease } = req.body;
        console.log(req.body)

        const appointment = await Appointment.create({
            'doctorid' : doctorid,
            'doctorname': doctorname,
            'doctorspecialization' : doctorspecialization,
            'patientid' : patientid,
            'scheduleddate': scheduleddate,
            'scheduledtime' : scheduledtime,
            'type' : type,
            'disease' : disease,
            'status' : "Pending",
            'consultantfee' : '100',
        });
        res.status(200).json({ success: true, message: 'Appointment Booked Sucessfully successfully', appointment });
        console.log('Inserted:', appointment);
    }
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting appointment details', error: error.message });
    }
})

// get all appointment of a patient
router.post('/details/:patientId', async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const appointments = await Appointment.find({'patientid' : patientId }).sort({ scheduleddate : -1 });;
      if (!appointments.length) {
        return res.status(404).json({ success: false , message: 'No appointments found for this patient' });
      }
      res.status(200).json({success: true , appointments});
      console.log(appointments)
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router