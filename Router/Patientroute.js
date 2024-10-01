const express = require('express')
const router = express.Router()
const Patientinfo = require('../Models/Doctor/Patientinfo')

router.post('/createpatient', async (req, res)=>{
    try {
        const patient = await Patientinfo.create({
            
        
    });
    res.json(patient);
    console.log('Inserted:', patient);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting patient', error: error.message });
        
    }
})

module.exports = router