const express = require('express')
const router = express.Router()
const Staffinfo = require('../Models/Staff/Staffinfo')


// add staff
router.post('/createstaff', async (req, res)=>{
    try {
        const { id, name, gender, email, phone, role, experience, dob, password } = req.body;
        console.log(req.body)

        const staff = await Staffinfo.create({
            'id' : id,
            'name' : name,
            'gender' : gender,
            'dob' : dob,
            'email' : email,
            'phone' : phone,
            'role' : role,
            'experience' : experience,
            'password' : password
        });

        res.status(200).json({ message: 'Staff inserted successfully', staff });
        console.log('Inserted:', staff);

        if (!staff){
            res.status(400).json({ message: 'Staff not inserted' });
        }
        
    } catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting staff', error: error.message });
        console.log(error)
    }
})



router.post('/allstaff', async (req, res) => {
    try {
      const staff = await Staffinfo.find(); 
      res.status(200).json(staff); 
      console.log(staff)
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
      const staff = await Staffinfo.findOne({ 'id' : id });
  
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
      const updatedstaff = await Staffinfo.findOneAndUpdate(
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
      console.log(updatedstaff)

    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({ message: 'Error updating staff', error: error.message });
    }
});



// DELETE route to delete a staff by ObjectId
router.post('/deletestaff', async (req, res) => {
    try {
      const {id} = req.body; // Assuming the _id is sent as a URL parameter
      console.log(id)
      // Deleting a staff by ObjectId
      const staff = await Staffinfo.findOneAndDelete({ 'id' : id});
  
      if (!staff) {
        return res.status(404).json({ message: "staff not found" });
      }
  
      res.status(200).json({ message: "staff deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting staff", error: error.message });
      console.log(error.message);
    }
  });

module.exports = router