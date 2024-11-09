const express = require('express')
const router = express.Router()
const Admission = require('../Models/Admissioninfo')

router.post("/createadmission" , async (req, res) => {

    try {
        const {patientid , patientname , doctorid , staffid , wardno , wardtype , bedno ,  admissiondateandtime , dischargedateandtime , reason } = req.body;

        const admission = await Admission.create({
            'patientid' : patientid,
            'patientname' : patientname,
            'doctorid' : doctorid,
            'staffid' : staffid,
            'wardno' : wardno,
            'wardtype' : wardtype,
            'bedno' : bedno,
            'admissiondateandtime' : admissiondateandtime,
            'dischargedateandtime' : dischargedateandtime,
            'reason' : reason,

        })

        res.status(200).json({message : 'Admission details Added' , admission})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting admission details', error: error.message });
    }
})


router.post('/admissiondetails', async (req, res) => {
    try {
      const admission = await Admission.find(); // Fetch test details from the collection
      res.status(200).json(admission);
      // console.log(patient)
    } catch (error) {
      console.error("Error fetching admission details:", error);
      res.status(500).json({ message: 'Error fetching admission details', error: error.message });
    }
  });

  // Find details of a single patient
router.post('/patientadmissiondetail/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one patient by the  id
    const admission = await Admission.findOne({ 'patientid' : id });

    if (!admission) {
      return res.status(404).json({ message: `admission details of patient not found ${id}` });
    }

    // res.status(200).json(patient);
    res.send(admission)
    console.log(admission)
  } catch (error) {
    console.error('Error fetching admission details:', error);
    res.status(500).json({ message: 'Error fetching admission details', error: error.message });
  }
});



module.exports = router
