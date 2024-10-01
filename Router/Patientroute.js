const express = require('express')
const router = express.Router()
const Patientinfo = require('../Models/Doctor/Patientinfo')

router.post('/createpatient', async (req, res)=>{
    try {
        const patient = await Patientinfo.create({
        'id' : '',
        'name' : {type : String, required : true},
        'gender' : {type : String, required : true},
        'email' : {type : String, required : true},
        'password' : {type : String, required : true},
        'dob' : Date,
        'age' : {type : Number, required : true},
        'phone' : {type : String, required : true},
        'emergencycontact' : Number,
        'address' : {type : String, required : true},
        'bloodgroup' : {type : String, required : true},
        'adharno' : {type : Number, required : true},
        'medicalhistory' : String
        
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