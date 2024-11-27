const express = require('express')
const router = express.Router()
const Test = require('../Models/Testinfo')
const Bill = require('../Models/Billinfo')

router.post("/create" , async (req, res) => {

    try {
        const {patientid , patientname , doctorid , staffid , testname , result , status, } = req.body;

        const test = await Test.create({
            'staffid' : staffid,
            'patientid' : patientid,
            'patientname' : patientname,
            'doctorid' : doctorid,
            'testname' : testname,
            'status' : status,
            'result' : result,
        })

        res.status(200).json({message : 'Test Added' , test})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting test', error: error.message });
    }
})



router.post('/testdetails', async (req, res) => {
    try {
      const test = await Test.find(); // Fetch test details from the collection
      res.status(200).json(test);
      // console.log(patient)
    } catch (error) {
      console.error("Error fetching test details:", error);
      res.status(500).json({ message: 'Error fetching test details', error: error.message });
    }
  });

  // Find details of a single patient
router.post('/patienttestdetail/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one patient by the  id
    const test = await Test.findOne({ 'patientid' : id });

    if (!test) {
      return res.status(404).json({ message: 'test details of patient not found ${id}' });
    }

    // res.status(200).json(patient);
    res.send(test)
    console.log(test)
  } catch (error) {
    console.error('Error fetching test details:', error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});


// Update detaiils of patient with id
router.post('/updatetest/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const updateData = req.body;
  console.log(updateData)
  const newTestFee = updateData.fee;
  
  
  try {
    // Find the patient by id and update with new data
    const updatedtest = await Test.findOneAndUpdate(
      { _id: id },  // Find patient by id
      { $set: updateData },  // Update the patient's details with the new data
      { new: true } // Return the updated document
    );
    
    // If no patient found, return a 404 error
    if (!updatedtest) {
      return res.status(404).json({ message: 'Not Updated' });
    }

    const billUpdateResult = await Bill.updateOne(
      { 'patientid': updateData.patientid }, // Find the document by patientid
      { $set: { 'fees.testfee': newTestFee } } // Update the testfee
    );

    console.log('billfee:', billUpdateResult)

    // Return the updated patient
    res.status(200).json({message: 'Details Updated Sucessfully' , updatedtest});
    // console.log(updatedtest)

  } catch (error) {
    console.error('Error updating test details:', error);
    res.status(500).json({ message: 'Error updating test details', error: error.message });
  }
});


// DELETE route to delete a test by ObjectId
router.post('/deletetest', async (req, res) => {
  try {
    const {id} = req.body; // Assuming the _id is sent as a URL parameter
    console.log(id)
    // Deleting a test by ObjectId
    const test = await Test.findOneAndDelete({ 'id' : id});

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting test", error: error.message });
    console.log(error.message);
  }
});


// Find details of a single patients test details
router.post('/findtest/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one patient by the  id
    const test = await Test.findOne({ 'id' : id });

    if (!test) {
      return res.status(404).json({ message: `test not found ${id}` });
    }

    // res.status(200).json(test);
    res.send(test)
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Error fetching test', error: error.message });
  }
});


module.exports = router