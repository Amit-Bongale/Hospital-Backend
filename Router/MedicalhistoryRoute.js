const express = require('express')
const router = express.Router()
const Medicalhistory = require('../Models/Medicalhistoryinfo')

router.post("/createmedicalhistory" , async (req, res) => {

    try {
        const {patientid , doctorid , disease , prescription } = req.body;

        const medicalhistory = await Medicalhistory.create({
            'patientid' : patientid,
            'doctorid' : doctorid,
            'disease' : disease,
            'prescription' : prescription,
        })

        res.status(200).json({message : 'Medicalhistory Added' , medicalhistory})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting medicalhistory', error: error.message });
    }
})



// Find details of a single patient
router.post('/patientmedicalhistory/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    try {
      // Find one patient by the  id
      const medicalhistory = await Medicalhistory.findOne({ 'patientid' : id });
  
      if (!medicalhistory) {
        return res.status(404).json({ message: `medicalhistory of patient not found ${id}` });
      }
  
      // res.status(200).json(patient);
      res.send(medicalhistory)
      console.log(medicalhistory)
    } catch (error) {
      console.error('Error fetching medicalhistory :', error);
      res.status(500).json({ message: 'Error fetching medicalhistory', error: error.message });
    }
  });


module.exports = router
