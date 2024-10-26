const express = require('express')
const router = express.Router()
const Test = require('../Models/Test/Testinfo')

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

module.exports = router