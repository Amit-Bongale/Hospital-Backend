// const express = require('express')
// const router = express.Router()
// const Medicalhistory = require('../Models/Medicalhistoryinfo')

// router.post("/createmedicalhistory" , async (req, res) => {

//     try {
//         const {patientid , doctorid , disease , prescription } = req.body;

//         const medicalhistory = await Medicalhistory.create({
//             'patientid' : patientid,
//             'doctorid' : doctorid,
//             'disease' : disease,
//             'prescription' : prescription,
//         })

//         res.status(200).json({message : 'Medicalhistory Added' , medicalhistory})
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Error inserting medicalhistory', error: error.message });
//     }
// })



// // Find details of a single patient
// router.post('/patientmedicalhistory/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(id)
    
//     try {
//       // Find one patient by the  id
//       const medicalhistory = await Medicalhistory.findOne({ 'patientid' : id });
  
//       if (!medicalhistory) {
//         return res.status(404).json({ message: `medicalhistory of patient not found ${id}` });
//       }
  
//       // res.status(200).json(patient);
//       res.send(medicalhistory)
//       console.log(medicalhistory)
//     } catch (error) {
//       console.error('Error fetching medicalhistory :', error);
//       res.status(500).json({ message: 'Error fetching medicalhistory', error: error.message });
//     }
//   });


// module.exports = router

const express = require('express');
const router = express.Router();
const Medicalhistory = require('../Models/Medicalhistoryinfo');

// Create new medical history record
router.post("/createmedicalhistory", async (req, res) => {
    try {
        const { patientid, doctorid, disease, prescription, appointmentType } = req.body;

        const medicalHistory = await Medicalhistory.create({
            patientid,
            doctorid,
            disease,
            prescription,
            appointmentType,
        });

        res.status(200).json({ message: 'Medical history added', medicalHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting medical history', error: error.message });
    }
});

// Fetch medical history of a single patient
router.post('/patientmedicalhistory/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const medicalHistory = await Medicalhistory.find({ patientid: id });

        if (!medicalHistory.length) {
            return res.status(404).json({ message: `No medical history found for patient ${id}` });
        }

        res.status(200).json(medicalHistory);
    } catch (error) {
        console.error('Error fetching medical history:', error);
        res.status(500).json({ message: 'Error fetching medical history', error: error.message });
    }
});

module.exports = router;

