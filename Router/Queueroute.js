const express = require('express')
const router = express.Router()
const Queue = require('../Models/Queueinfo')

router.post("/createqueue" , async (req, res) => {

    try {
        const {id , name , gender , disease , type,  mobileno , status, } = req.body;

        const queue = await Queue.create({
            'id' : id,
            'name' : name,
            'gender' : gender,
            'disease' : disease,
            'type': type, 
            'mobileno' : mobileno,
            'status' : status,
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
      const queue = await Queue.find(); // Fetch all doctors from the collection
      res.status(200).json(queue); // Return all doctors in JSON format
      console.log(queue)
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});

module.exports = router