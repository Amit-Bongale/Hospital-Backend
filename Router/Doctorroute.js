const express = require('express')
const router = express.Router()
const Doctorinfo = require('../Models/Doctor/Doctorinfo')

// insert doctors
router.post('/createdoctor', async (req, res)=>{
    
  try {
    const { id, name, gender, email, password, specialization, phone, experience, dob , image} = req.body;
    console.log(req.body)

    const doctor = await Doctorinfo.create({
      'id': id,
      'name': name,
      'gender': gender,
      'email': email,
      'password': password,
      'specialization': specialization,
      'phone': phone,
      'experience': experience,
      'dob': new Date(dob),
      'image': image,
      'status' : false
    });

    res.status(200).json({ message: 'Doctor inserted successfully', doctor });
    console.log('Inserted:', doctor);

    if(!doctor){
      res.status(400).json({ message: 'Failed to insert doctor' });
    }

  }
  catch (error) {
    console.error("Insertion Error:", error);
    res.status(500).json({ message: 'Error inserting doctor', error: error.message });
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }
  }
})


// get all docotrs
router.post('/alldoctors', async (req, res) => {
    try {
      const doctors = await Doctorinfo.find(); // Fetch all doctors from the collection
      res.status(200).json(doctors); // Return all doctors in JSON format
      // console.log(doctors)
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});


// Find a single docotr
router.get('/finddoctor/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one doctor by the provided id
    const doctor = await Doctorinfo.findOne({ 'id' : id });

    // If no doctor is found, return a 404 error
    if (!doctor) {
      return res.status(404).json({ message: `Doctor not found ${id}` });
    }

    res.status(200).json(doctor);
    // console.log(doctor)
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
});


// Update Route
router.post('/updatedoctor/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    // Find the doctor by id and update with new data
    const updatedDoctor = await Doctorinfo.findOneAndUpdate(
      { id: id },  // Find doctor by id
      { $set: updateData },  // Update the doctor's details with the new data
      { new: true } // Return the updated document
    );
    
    // If no doctor found, return a 404 error
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Return the updated doctor
    res.status(200).json({message: 'Details Updated Sucessfully' ,updatedDoctor});
    console.log(updatedDoctor)

  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
});


// DELETE route to delete a doctor by ObjectId
router.post('/deletedoctor', async (req, res) => {
  try {
    const {id} = req.body; // Assuming the _id is sent as a URL parameter
    console.log(id)
    // Deleting a doctor by ObjectId
    const doctor = await Doctorinfo.findOneAndDelete({ 'id' : id});

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
    console.log(error.message);
  }
});


module.exports = router