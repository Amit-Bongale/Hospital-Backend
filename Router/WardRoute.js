const express = require('express')
const router = express.Router()
const Ward = require('../Models/Wardsinfo')

// find Total number of wards and active doctors
router.get('/wardstatus', async (req, res) => {
    try {
        const totalrooms = await Ward.countDocuments({});
        const usedrooms = await Ward.countDocuments({ 'status': true });
        res.status(200).json({ totalrooms, usedrooms });
    } catch (error) {
        console.error("Error fetching doctor statistics:", error);
        res.status(500).json({ message: 'Error fetching doctor statistics', error: error.message });
    }
});

router.post('/create' , async (req, res) => {
    try {
        const { wardnumber ,  type , bednumber } = req.body;
        console.log(req.body)

        const ward = await Ward.create({
            'wardnumber' : wardnumber,
            'type' : type,
            'bednumber' : bednumber,
        });

        res.status(200).json({ message: 'ward inserted successfully', ward });
        console.log(ward)
            
    } catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting ward Info', error: error.message });
        console.log(error)
    }
})


// get all ward info
router.post('/details', async (req, res) => {
    try {
      const ward = await Ward.find(); 
      res.status(200).json(ward); 
      // console.log(ward)
    } catch (error) {
      console.error("Error fetching ward details:", error);
      res.status(500).json({ message: 'Error fetching Ward Details', error: error.message });
    }
});


// Find details of a single ward
router.post('/findward/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    try {
      // Find one patient by the  id
      const ward = await Ward.findOne({ '_id' : id });
  
      if (!ward) {
        return res.status(404).json({ message: `ward not found ${id}` });
      }
  
      // res.status(200).json(patient);
      res.send(ward)
    } catch (error) {
      console.error('Error fetching ward:', error);
      res.status(500).json({ message: 'Error fetching ward', error: error.message });
    }
});



// Update detaiils of ward with id
router.post('/updateward/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    try {
  
      // Find the patient by id and update with new data
      const updatedward = await Ward.findOneAndUpdate(
        { _id: id },  // Find patient by id
        { $set: updateData },  // Update the patient's details with the new data
        { new: true } // Return the updated document
      );
      
      // If no patient found, return a 404 error
      if (!updatedward) {
        return res.status(404).json({ message: 'ward not found' });
      }
  
      // Return the updated patient
      res.status(200).json({message: 'Details Updated Sucessfully' , updatedward});
      console.log(updatedward)
  
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
});



// DELETE route to delete a ward by Id
router.post('/deleteward', async (req, res) => {
    try {
      const {id} = req.body; 
      console.log(id)
  
      // Deleting a ward by Id
      const ward = await Ward.findOneAndDelete({ '_id' : id});
  
      if (!ward) {
        return res.status(404).json({ message: "ward not found" });
      }
  
      res.status(200).json({ message: "ward deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ message: "Error deleting ward", error: error.message });
      console.log(error.message);
    }
});



module.exports = router