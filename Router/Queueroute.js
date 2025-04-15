const express = require('express')
const router = express.Router()
const Queue = require('../Models/Queueinfo')
const Bill = require('../Models/Billinfo')

const jwt = require('jsonwebtoken')
const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

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
            'patientname' : name
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
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set time to today's 11:59:59 PM

        const queue = await Queue.find({
            date: { $lte: endOfDay } // Fetch appointments of patients before today's midnight
        }); 
        
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



router.post('/deletepatient', async (req, res) => {
    try {
      const {id} = req.body; // Assuming the _id is sent as a URL parameter
      console.log(id)
      // Deleting a test by ObjectId
      const queue = await Queue.findOneAndDelete({ 'id' : id});
  
      if (!queue) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json({ message: " Treatment is done" });
    } catch (error) {
      res.status(500).json({ message: "The treatment has not been completed.", error: error.message });
      console.log(error.message);
    }
});



// find Total number of doctors and active doctors
router.get('/active', async (req, res) => {
    try {
      const activepatients = await Queue.countDocuments({});
      res.status(200).json(activepatients);
    } catch (error) {
      console.error("Error fetching Patient statistics:", error);
      res.status(500).json({ message: 'Error fetching patient statistics', error: error.message });
    }
});
  
module.exports = router