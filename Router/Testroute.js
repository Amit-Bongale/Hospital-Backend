const express = require('express')
const router = express.Router()
const Test = require('../Models/Testinfo')
const Bill = require('../Models/Billinfo')

const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

router.post("/create" , VerifyToken, AuthorizedRoles("doctor", "staff"), async (req, res) => {

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

    global.io.to(`staff`).emit("newTest", test);

    res.status(200).json({message : 'Test Added' , test})
      
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error inserting test', error: error.message });
  }
})



router.post('/testdetails', VerifyToken, AuthorizedRoles("admin", "doctor", "staff"), async (req, res) => {
  try {
    const test = await Test.find({ status: { $ne: "Completed" } }); // Fetch test details which not not completed
    res.status(200).json(test);
    // console.log(patient)
  } catch (error) {
    console.error("Error fetching test details:", error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});

// Find details of a single patient
router.post('/patienttestdetail/:id', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff", "patient"), async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one patient by the  id
    const test = await Test.find({ 'patientid' : id }).sort({date : -1});

    if (!test) {
      return res.status(404).json({ message: 'test details of patient not found ${id}' });
    }
    res.status(200).send(test)

  } catch (error) {
    console.error('Error fetching test details:', error);
    res.status(500).json({ message: 'Error fetching test details', error: error.message });
  }
});


// Update detaiils of patient with id
router.post('/updatetest/:id', VerifyToken, AuthorizedRoles("doctor", "staff"), async (req, res) => {
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

    global.io.to(`doctor_${doctorid}`).emit("Testupdates", updatedtest);

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
router.post('/deletetest', VerifyToken, AuthorizedRoles("doctor", "staff"), async (req, res) => {
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
router.post('/findtest/:id', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff", "patient"), async (req, res) => {
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



// Fetch last test of patient
router.post('/last/:id', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff", "patient"), async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.find({ 'patientid': id }).sort({date : -1}).limit(1);

    if (!test.length) {
        return res.status(404).json({ message: `No Test found for patient ${id}` });
    }
    res.status(200).json(test);
      
  } catch (error) {
    console.error('Error fetching test history:', error);
    res.status(500).json({ message: 'Error fetching test history', error: error.message });
  }
});


module.exports = router