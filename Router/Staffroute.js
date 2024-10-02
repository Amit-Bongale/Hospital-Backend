const express = require('express')
const router = express.Router()
const Staffinfo = require('../Models/Staff/Staffinfo')

router.post('/createstaff', async (req, res)=>{
    try {
        const staff = await Staffinfo.create({
        'id' : 'S001',
        'name' : 'preethi',
        'gender' : 'Female',
        'dob' : 3-4-2003,
        'age' : 21,
        'email' : 'pre@gmail.com',
        'phone' : 7654389623,
        'password' : 'prn123'
        
    });
    res.json(staff);
    console.log('Inserted:', staff);
}
    catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error inserting staff', error: error.message });
        
    }
})

module.exports = router