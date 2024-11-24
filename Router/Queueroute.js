const express = require('express')
const router = express.Router()
const Queue = require('../Models/Queueinfo')
const Bill = require('../Models/Billinfo')

router.post("/createqueue" , async (req, res) => {
    try {
        const {id , name , gender , disease , mobileno , type, status, doctorid } = req.body;
        console.log(req.body)

        const queue = await Queue.create({
            'id' : id,
            'name' : name,
            'gender' : gender,
            'disease' : disease,
            'type': type,
            'mobileno' : mobileno,
            'status' : status,
            'doctorid' : doctorid,
        })

        await Bill.create({
            'patientid' : id,
        })
        
        res.status(200).json({message : 'Patient Added To Queue' , queue})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting patient', error: error.message });
    }
})


//TO GET ALL PATIENT IN QUEUE 
router.post('/allpatient', async (req, res) => {
    try {
        const queue = await Queue.find(); // Fetch all patients assigned to queue
        res.status(200).json(queue); 
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});


//TO GET ALL PATIENT IN QUEUE for assigned doctor
router.post('/allpatient/:doctorid', async (req, res) => {
    try {
        let {doctorid} = req.params;
        const queue = await Queue.find({'doctorid' : doctorid}); // Fetch all patients assigned to doctors from the queue
        res.status(200).json(queue); 
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});


module.exports = router