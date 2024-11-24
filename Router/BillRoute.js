const express = require('express')
const router = express.Router()
const Bill = require('../Models/Billinfo')


// get all bills
router.post('/allbills', async (req, res) => {
    try {
      const patient = await Bill.find(); // Fetch all patient from the collection
      res.status(200).json(patient);
      // console.log(patient)
    } catch (error) {
      console.error("Error fetching Bills:", error);
      res.status(500).json({ message: 'Error fetching Bills', error: error.message });
    }
});


// Find Bill of a single patient
router.post('/findbill/:id', async (req, res) => {
    const { id } = req.params;
    console.log("bill:" , id)
    
    try {
      // Find one patient by the  id
      const patientbill = await Bill.findOne({ 'patientid' : id , 'status' : "not paid"});
  
      if (!patientbill) {
        return res.status(404).json({ message: `patient bill not found ${id}` });
      }
  
      res.status(200).json(patientbill);
      console.log(patientbill)
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
});


module.exports = router