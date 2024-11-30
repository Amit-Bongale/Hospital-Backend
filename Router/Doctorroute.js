const express = require('express')
const router = express.Router()
const Doctor = require('../Models/Doctorinfo')
const {hashPassword} = require('../Utility/bcrypt')


// insert doctors
router.post('/createdoctor', async (req, res)=>{
    
  try {
    const { id, name, gender, email, password, specialization, phone, experience, dob , image} = req.body;
    console.log( "body:", req.body)

    const hashedPassword = await hashPassword(password);

    const doctor = await Doctor.create({
      'id': id,
      'name': name,
      'gender': gender,
      'email': email,
      'password': hashedPassword,
      'specialization': specialization,
      'phone': phone,
      'experience': experience,
      'dob': new Date(dob),
      'image': image,
      'status' : false,
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
    const doctors = await Doctor.find(); // Fetch all doctors from the collection
    res.status(200).json(doctors); // Return all doctors in JSON format
    // console.log(doctors)
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
});


// Find a single docotr
router.post('/finddoctor/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    // Find one doctor by the provided id
    const doctor = await Doctor.findOne({ 'id' : id });

    // If no doctor is found, return a 404 error
    if (!doctor) {
      return res.status(404).json({ message: `Doctor not found ${id}` });
    }

    res.status(200).json(doctor);
    
    console.log(doctor)
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
    const updatedDoctor = await Doctor.findOneAndUpdate(
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
    const doctor = await Doctor.findOneAndDelete({ 'id' : id});

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
    console.log(error.message);
  }
});


// find Total number of doctors and active doctors
router.get('/doctorstats', async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments({});
    const activeDoctors = await Doctor.countDocuments({ 'status': true });

    res.status(200).json({ totalDoctors, activeDoctors });
  } catch (error) {
    console.error("Error fetching doctor statistics:", error);
    res.status(500).json({ message: 'Error fetching doctor statistics', error: error.message });
  }
});




router.post('/login', async (req, res) => {

  const { id, password } = req.body;

  try {
    // Check if the user exists
    const user = await Doctor.findOne({'id' : id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account Does not Exist' });
    }
    
    console.log(user)
    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    await Doctor.updateOne({ 'id' : id }, { 'status': true });

    // Respond with success message
    res.status(200).json({ success: true, message: 'Login successful',
      user: { 
        id: user.id, 
        name: user.name,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// set Doctor status inactive after logout
router.post('/logout', async (req, res) => {
  const { id } = req.body;
  try {
    await Doctor.updateOne({ 'id' : id }, { 'status': false });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router