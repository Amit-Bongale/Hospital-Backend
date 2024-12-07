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


// get all docotrs
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

module.exports = router