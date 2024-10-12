const express = require('express')
const router = express.Router()
const Patientinfo = require('../Models/Patient/Patientinfo')

router.post('/createnewpatient', async (req, res)=>{
    try {
        const { id, name, gender, email, phone, dob, age, address, emergencycontact,  bloodgroup, adharno, medicalhistory } = req.body;
        console.log(req.body)

        const patient = await Patientinfo.create({
        'id' : id,
        'name' : name,
        'gender' : gender,
        'phone' : phone,
        'email' : email,
        'dob' : dob,
        'age' : age,
        'emergencycontact' : emergencycontact,
        'address' : address,
        'bloodgroup' : bloodgroup,
        'adharno' : adharno,
        'medicalhistory' : medicalhistory
        
    });
    res.status(200).json({ message: 'Patient inserted successfully', patient });
    console.log('Inserted:', patient);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting patient', error: error.message });
        
    }
})


// get details all patients
router.post('/allpatients', async (req, res) => {
    try {
      const patient = await Patientinfo.find(); // Fetch all patient from the collection
      res.status(200).json(patient);
      // console.log(patient)
    } catch (error) {
      console.error("Error fetching patient:", error);
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
});



// Find details of a single patient
router.get('/findpatient/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    try {
      // Find one patient by the provided id
      const patient = await Patientinfo.findOne({ 'id' : id });
  
      // If no patient is found, return a 404 error
      if (!patient) {
        return res.status(404).json({ message: `patient not found ${id}` });
      }
  
      res.status(200).json(patient);
      // console.log(patient)
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
});


// Update detaiils of patient with id
router.post('/updatepatient/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    try {
      // Find the patient by id and update with new data
      const updatedpatient = await Patientinfo.findOneAndUpdate(
        { id: id },  // Find patient by id
        { $set: updateData },  // Update the patient's details with the new data
        { new: true } // Return the updated document
      );
      
      // If no patient found, return a 404 error
      if (!updatedpatient) {
        return res.status(404).json({ message: 'patient not found' });
      }
  
      // Return the updated patient
      res.status(200).json({message: 'Details Updated Sucessfully' , updatedpatient});
      console.log(updatedpatient)
  
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
});



// DELETE route to delete a patient by Id
router.post('/deletepatient', async (req, res) => {
    try {
      const {id} = req.body; 
      console.log(id)

      // Deleting a patient by Id
      const patient = await Patientinfo.findOneAndDelete({ 'id' : id});
  
      if (!patient) {
        return res.status(404).json({ message: "patient not found" });
      }
  
      res.status(200).json({ message: "patient deleted successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error deleting patient", error: error.message });
      console.log(error.message);
    }
});


module.exports = router