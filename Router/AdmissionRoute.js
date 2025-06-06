const express = require('express')
const router = express.Router()
const Admission = require('../Models/Admissioninfo')

const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

router.post("/createadmission" , VerifyToken, AuthorizedRoles("admin" , "doctor", "staff"), async (req, res) => {

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


router.post('/admissiondetails', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff"), async (req, res) => {
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



// Update detaiils of patient with id
router.post('/updateadmission/:id', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff"), async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const updateData = req.body;
  console.log(updateData)
  
  try {
    // Find the patient by id and update with new data
    const updatedadmission = await Admission.findOneAndUpdate(
      { patientid: id },  // Find patient by id
      { $set: updateData },  // Update the patient's details with the new data
      { new: true } // Return the updated document
    );
    
    // If no patient found, return a 404 error
    if (!updatedadmission) {
      return res.status(404).json({ message: 'Not Updated' });
    }

    // Return the updated patient
    res.status(200).json({message: 'Details Updated Sucessfully' , updatedadmission});
    console.log(updatedadmission)

  } catch (error) {
    console.error('Error updating admission details:', error);
    res.status(500).json({ message: 'Error updating admission details', error: error.message });
  }
});

  
// DELETE route to delete a admission by ObjectId
router.post('/deleteadmission', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff"), async (req, res) => {
  try {
    const {id} = req.body; // Assuming the id is sent as a URL parameter
    console.log(id)
    // Deleting a admission by ObjectId
    const admit = await Admission.findOneAndDelete({ 'id' : id});

    if (!admit) {
      return res.status(404).json({ message: "admission not found" });
    }

    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admission", error: error.message });
    console.log(error.message);
  }
});


module.exports = router