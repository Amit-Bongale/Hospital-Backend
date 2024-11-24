const express = require('express')
const router = express.Router()
const Staff = require('../Models/Staffinfo')


// add staff
router.post('/createstaff', async (req, res)=>{
  try {
    const { id, name, gender, email, phone, role, experience, dob, password , image } = req.body;
    console.log(req.body)

    const staff = await Staff.create({
      'id' : id,
      'name' : name,
      'gender' : gender,
      'dob' : dob,
      'email' : email,
      'phone' : phone,
      'role' : role,
      'experience' : experience,
      'password' : password,
      'image' : image,
      'status' : false
    });

    res.status(200).json({ message: 'Staff inserted successfully', staff });
    // console.log('Inserted:', staff);

    if (!staff){
      res.status(400).json({ message: 'Staff not inserted' });
    }
      
  } catch (error) {
    console.error("Insertion Error:", error);
    res.status(500).json({ message: 'Error inserting staff', error: error.message });
    console.log(error)
  }
})


// find all staffs
router.post('/allstaff', async (req, res) => {
  try {
    const staff = await Staff.find(); 
    res.status(200).json(staff); 
    // console.log(staff)
  } catch (error) {
    console.error("Error fetching staffs:", error);
    res.status(500).json({ message: 'Error fetching staffs', error: error.message });
  }
});



// Find a single docotr
router.get('/findstaff/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    const staff = await Staff.findOne({ 'id' : id });

    if (!staff) {
      return res.status(404).json({ message: `staff not found ${id}` });
    }

    res.status(200).json(staff);
    // console.log(staff)
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
});



// Update Route
router.post('/updatestaff/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    // Find the staff by id and update with new data
    const updatedstaff = await Staff.findOneAndUpdate(
      { id: id },  // Find staff by id
      { $set: updateData },  // Update the staff's details with the new data
      { new: true } // Return the updated document
    );
    
    // If no staff found, return a 404 error
    if (!updatedstaff) {
      return res.status(404).json({ message: 'staff not found' });
    }

    // Return the updated staff
    res.status(200).json({message: 'Staff Details Updated Sucessfully' , updatedstaff});
    // console.log(updatedstaff)

  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ message: 'Error updating staff', error: error.message });
  }
});



// DELETE route to delete a staff by Id
router.post('/deletestaff', async (req, res) => {
  try {
    const {id} = req.body;
    console.log(id)

    // Deleting a staff by Id
    const staff = await Staff.findOneAndDelete({ 'id' : id});

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff", error: error.message });
    console.log(error.message);
  }
});


// find Total number of staff and active staff
router.get('/staffstats', async (req, res) => {
  try {
    const totalstaff = await Staff.countDocuments({});
    const activestaff = await Staff.countDocuments({ 'status': true });

    res.status(200).json({ totalstaff, activestaff });
    // console.log(totalstaff , activestaff)
  } catch (error) {
    console.error("Error fetching Staff statistics:", error);
    res.status(500).json({ message: 'Error fetching Staff statistics', error: error.message });
  }
});



router.post('/login', async (req, res) => {

  const { id, password } = req.body;

  try {
    // Check if the user exists
    const user = await Staff.findOne({'id' : id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account Does not Exist' });
    }
    
    console.log(user)
    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // update staff status to active
    await Staff.updateOne({ 'id' : id }, { 'status': true });

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
    
    await Staff.updateOne({ 'id' : id }, { 'status': false });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router