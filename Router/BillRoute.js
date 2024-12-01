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


router.post('/bills', async (req, res) => {
  try {
    const patient = await Bill.find({'status' : "not paid"}); // Fetch all patient from the collection
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
  console.log(" bill for patient ID:" , id)
  
  try {
    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    // Find one patient by the  id
    const patientbill = await Bill.findOne({ 'billno' : id , 'status' : "not paid"});

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


// set Doctor status inactive after logout
router.post('/paid', async (req, res) => {
  const { billno } = req.body;
  try {
    await Bill.updateOne({ 'billno' : billno }, { 'status': 'paid' });
    res.status(200).json({ success: true, message: 'Bill Updated' });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router