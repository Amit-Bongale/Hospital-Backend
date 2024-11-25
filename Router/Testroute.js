const express = require('express');
const router = express.Router();
const Test = require('../Models/Testinfo');
const Bill = require('../Models/Billinfo');

// Create a new test
router.post("/create", async (req, res) => {
  try {
    const { patientid, patientname, doctorid, staffid, testname, result, status } = req.body;
    const test = await Test.create({
      staffid, patientid, patientname, doctorid, testname, result, status
    });
    res.status(200).json({ message: 'Test Added', test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting test', error: error.message });
  }
});

// Fetch all test details
router.post('/testdetails', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching test details:", error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});

// Fetch a single patient's test details by patient ID
router.post('/patienttestdetail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tests = await Test.find({ patientid: id });
    if (!tests.length) {
      return res.status(404).json({ message: `No test details found for patient ID ${id}` });
    }
    res.status(200).json(tests);
  } catch (error) {
    console.error('Error fetching patient test details:', error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});

// Update test details by test ID
router.post('/updatetest/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedTest = await Test.findByIdAndUpdate(id, { $set: updateData}, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const result = await Bill.updateOne(
      { patientid: patientId }, // Find the document by patientid
      { $set: { 'fees.testfee': newTestFee } } // Update the testfee
  );
    res.status(200).json({ message: 'Test details updated successfully', updatedTest });
  } catch (error) {
    console.error('Error updating test details:', error);
    res.status(500).json({ message: 'Error updating test details', error: error.message });
  }
});

// Delete a test by test ID
router.post('/deletetest', async (req, res) => {
  const { id } = req.body;
  try {
    const test = await Test.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ message: "Error deleting test", error: error.message });
  }
});

module.exports = router;
