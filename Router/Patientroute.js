const express = require('express')
const router = express.Router()
const Patientinfo = require('../Models/Patient/Patientinfo')

router.post('/createpatient', async (req, res)=>{
    try {
        const { id, name, gender, email, password, dob, age, phone, emergencycontact, address, bloodgroup, adharno, medicalhistory } = req.body;
        console.log(req.body)

        const patient = await Patientinfo.create({
        'id' : id,
        'name' : name,
        'gender' : gender,
        'email' : email,
        'password' : password,
        'dob' : dob,
        'age' : age,
        'phone' : phone,
        'emergencycontact' : emergencycontact,
        'address' : address,
        'bloodgroup' : bloodgroup,
        'adharno' : adharno,
        'medicalhistory' : medicalhistory
        
    });
    res.status(200).json({ message: 'Patient inserted successfully', patient });
    console.log('Inserted:', patient);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting patient', error: error.message });
        
    }
})

module.exports = router