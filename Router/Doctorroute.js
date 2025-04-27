const express = require('express')
const router = express.Router()
const Doctor = require('../Models/Doctorinfo')
const Doctorinfoschema = require('../Models/Doctorinfo')
const { hashPassword , comparePassword } = require('../Utility/bcrypt')
const Queue = require('../Models/Queueinfo')

const jwt = require('jsonwebtoken')
const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

// insert doctors
router.post('/createdoctor', VerifyToken, AuthorizedRoles("admin"), async (req, res)=>{
    
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
router.post('/updatedoctor/:id', VerifyToken, AuthorizedRoles("admin" , "doctor"), async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    if (updateData.password) {
      updateData.password = await hashPassword (updateData.password); // Hash the new password
    }
    
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
router.post('/deletedoctor',VerifyToken, AuthorizedRoles("admin"), async (req, res) => {
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
router.get('/doctorstats', VerifyToken, AuthorizedRoles("admin" , "doctor", "staff", "patient"), async (req, res) => {
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

    const isMatch = await comparePassword( password, user.password );
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid password.' });
    }

    await Doctor.updateOne({ 'id' : id }, { 'status': true });

    // Generate JWT token
    const token = jwt.sign({ id: user.id , name: user.name, role:"doctor"}, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie("token" , token , { httpOnly: true, maxAge : 24 * 60 * 60 * 1000 , sameSite: 'none', secure: true }) // 24 hours

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
router.post('/logout', VerifyToken, AuthorizedRoles("doctor"), async (req, res) => {
  const { id } = req.body;
  try {
    await Doctor.updateOne({ 'id' : id }, { 'status': false });
    res.clearCookie('token'); // Clear the cookie
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/doctordetailsqueue',  VerifyToken, AuthorizedRoles("admin" , "doctor", "staff"), async (req, res) => {
  try {
    const doctorsWithQueueCount = await Doctorinfoschema.aggregate([
      {
        $lookup: {
          from: "queues", // Name of the Queue collection in MongoDB (should match the actual name in lowercase)
          localField: "id",
          foreignField: "doctorid",
          as: "queueDetails",
        },
      },
      {
        $addFields: {
          queueCount: {
            $size: {
              $filter: {
                input: "$queueDetails",
                as: "queue",
                cond: { $eq: ["$$queue.status", "Waiting"] },
              },
            },
          },
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          gender: 1,
          email: 1,
          specialization: 1,
          phone: 1,
          experience: 1,
          dob: 1,
          image: 1,
          status: 1,
          queueCount: 1,
        },
      },
    ]);
    res.status(200).json(doctorsWithQueueCount);

  } catch (error) {
    console.error("Error fetching doctors and queue count:", error);
    throw new Error("Error fetching data");
  }
})


module.exports = router