const express = require('express');
const router = express.Router();
const Medicalhistory = require('../Models/Medicalhistoryinfo');

// Create new medical history record
router.post("/createmedicalhistory", async (req, res) => {
    try {
        const { patientid, doctorid, doctorname, disease, prescription, appointmenttype } = req.body;
        console.log(req.body)

        const medicalHistory = await Medicalhistory.create({
            'patientid':patientid,
            'doctorid' : doctorid,
            'doctorname' : doctorname,
            'disease' : disease,
            'appointmenttype' : appointmenttype,
            'prescription' : prescription,
        });

        res.status(200).json({ message: 'Medical history added', medicalHistory });
        console.log("Inserted :" , medicalHistory)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting medical history', error: error.message });
    }
});

// Fetch all medical history of a single patient
router.post('/patientmedicalhistory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const medicalHistory = await Medicalhistory.find({ patientid: id }).sort({date : -1});

        if (!medicalHistory.length) {
            return res.status(404).json({ message: `No medical history found for patient ${id}` });
        }
        res.status(200).json(medicalHistory);
    } catch (error) {
        console.error('Error fetching medical history:', error);
        res.status(500).json({ message: 'Error fetching medical history', error: error.message });
    }
});

// Fetch last 3 medical history of a single patient
router.post('/patientmedicalhistory/latest/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const medicalHistory = await Medicalhistory.find({ patientid: id }).sort({date : -1}).limit(3);

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