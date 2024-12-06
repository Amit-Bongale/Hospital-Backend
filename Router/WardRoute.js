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
        const { wardnumber ,  type , bednumber, status } = req.body;

        const ward = await Ward.create({
            'wardnumber' : wardnumber,
            'type' : type,
            'bednumber' : bednumber,
            'status' : status
        });

        res.status(200).json({ message: 'ward inserted successfully', ward });
            
    } catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting staff', error: error.message });
        console.log(error)
    }
})

module.exports = router