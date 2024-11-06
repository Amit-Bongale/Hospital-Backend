const express = require('express')
const router = express.Router()
const Patient = require('../Models/Patientinfo')

const { sendWelcomeMessage } = require('../Twilio/Messager')


// create new Patient (for staff create new Patient)
router.post('/createnewpatient', async (req, res)=>{
  try {
    const { id, name, gender, email, phone, dob, age, address, emergencycontact,  bloodgroup, aadharno, medicalhistory, password} = req.body;

    const existingPatient = await Patient.findOne({ 'id' : id });

    if (existingPatient) {
      return res.status(400).json({ message: 'A Patient with this ID already exists.'});
    }
    
    console.log(req.body)

    const patient = await Patient.create({
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
      'aadharno' : aadharno,
      'medicalhistory' : medicalhistory,
      'password' : password,
    });

    await sendWelcomeMessage(name, phone, id, password);

    res.status(200).json({ message: 'Patient inserted successfully', patient });
    console.log('Inserted:', patient);

  }
  catch (error) {
    console.error("Insertion Error:", error);
    res.status(500).json({ message: 'Error inserting patient', error: error.message });  
  }
})


// create user ( for user to create acc on website)
router.post('/createnewuser', async (req, res)=>{
  try {
    const { id, name, gender, email, phone, dob, age, address, emergencycontact,  bloodgroup, aadharno, medicalhistory, password } = req.body;
    
    console.log(req.body)

    const existingPatient = await Patient.findOne({ 'id' : id });

    if (existingPatient) {
      return res.status(400).json({ message: 'An account with this Details already exists. Please login' });
    }

    const patient = await Patient.create({
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
      'aadharno' : aadharno,
      'medicalhistory' : medicalhistory,
      'password' : password,
    });
    res.status(200).json({success: true, message: 'Account Created successfully, Please Login to Continue', patient });
    console.log('Inserted:', patient);
  }
  catch (error) {
    console.error("Insertion Error:", error);
    res.status(500).json({ message: 'Error Creating Account, please Try Again', error: error.message });  
  }
})


// get details all patients
router.post('/allpatients', async (req, res) => {
  try {
    const patient = await Patient.find(); // Fetch all patient from the collection
    res.status(200).json(patient);
    // console.log(patient)
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
});



// Find details of a single patient
router.post('/findpatient/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    try {
      // Find one patient by the  id
      const patient = await Patient.findOne({ 'id' : id });
  
      if (!patient) {
        return res.status(404).json({ message: `patient not found ${id}` });
      }
  
      // res.status(200).json(patient);
      res.send(patient)
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
    const updatedpatient = await Patient.findOneAndUpdate(
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
    const patient = await Patient.findOneAndDelete({ 'id' : id});

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    res.status(200).json({ message: "patient deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
    console.log(error.message);
  }
});


router.post('/login', async (req, res) => {

  const { id, password } = req.body;

  try {
    // Check if the user exists
    const user = await Patient.findOne({'id' : id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account Does not Exist' });
    }
    console.log(user)
    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Respond with success message
    res.status(200).json({ success: true, message: 'Login successful',
      user: { 
        id: user.id, 
        name: user.name,
        // You can include other user details as needed
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router