const express = require('express')
const router = express.Router()
const Test = require('../Models/Testinfo')

router.post("/create" , async (req, res) => {

    try {
        const {patientid , doctorid , staffid , testname , result , status, } = req.body;

        const test = await Test.create({
            'staffid' : staffid,
            'patientid' : patientid,
            'doctorid' : doctorid,
            'testname' : testname,
            'result' : result,
        })

        res.status(200).json({message : 'Test Added' , test})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error inserting test', error: error.message });
    }
})

router.post('/testdetails', async (req, res) => {
    try {
      const test = await Test.find(); // Fetch test details from the collection
      res.status(200).json(test);
      // console.log(patient)
    } catch (error) {
      console.error("Error fetching test details:", error);
      res.status(500).json({ message: 'Error fetching test details', error: error.message });
    }
  });



module.exports = router