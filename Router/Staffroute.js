const express = require('express')
const router = express.Router()
const Staffinfo = require('../Models/Staff/Staffinfo')

router.post('/createstaff', async (req, res)=>{
    try {
        const { id, name, gender, dob, age, email, phone, password} = req.body;
        console.log(req.body)

        const staff = await Staffinfo.create({
        'id' : id,
        'name' : name,
        'gender' : gender,
        'dob' : dob,
        'age' : age,
        'email' : email,
        'phone' : phone,
        'password' : password
        
    });
    res.status(200).json({ message: 'Staff inserted successfully', staff });
    console.log('Inserted:', staff);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting staff', error: error.message });
        
    }
})

module.exports = router