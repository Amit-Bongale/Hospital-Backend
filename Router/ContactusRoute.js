const express = require('express')
const router = express.Router()
const Contactus = require('../Models/Contactusinfo')

// Insert new contact request
router.post('/request' , (req,res) => {

    try {
        const {name,email,message} = req.body
        
        const contact = Contactus.create({
            'name':name,
            'email':email,
            'message':message
        })

        res.status(200).json({message: 'Request Submitted Successfully, We will Reach you out Soon' , contact})   
        
    } catch (error) {
        console.error("Insertion Error:", error);
        res.status(500).json({ message: 'Error Sending Message, Please try again', error: error.message });
    }
})


// get all contact requests
router.post('/allrequest',async (req, res) => {
    try {
        const contact = await Contactus.find().sort({ 'date' : -1 });
        console.log(contact)
        res.status(200).json(contact)
    } catch (error) {
        console.error("Fetching Error:", error);
        res.status(500).json({ message: 'Error Fetching Contact date', error: error.message });
    }
})


module.exports = router