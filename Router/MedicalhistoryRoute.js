const express = require('express')
const router = express.Router()
const Medicalhistory = require('../Models/Medicalhistoryinfo')

router.post("/createmedicalhistory" , async (req, res) => {

    try {
        const {patientid , doctorid , disease , prescription } = req.body;

        const medicalhistory = await Medicalhistory.create({
            'patientid' : patientid,
            'doctorid' : doctorid,
            'disease' : disease,
            'prescription' : prescription,
        })

        res.status(200).json({message : 'Medicalhistory Added' , medicalhistory})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting medicalhistory', error: error.message });
    }
})


module.exports = router
