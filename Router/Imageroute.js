const express = require('express')
const router = express.Router()
const Image = require('../Models/imageinfo')

const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

const uploadImage = require('../Config/Cloudinaryconfig')


router.post('/upload' , VerifyToken, AuthorizedRoles("admin"), async (req,res) => {

    console.log("data hit")
    console.log('Body:', req.body);


    const { id , image } = req.body
    console.log(req.body)
    
    // Check if the file is uploaded correctly
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedImageUrl = await uploadImage(image);

    try {
        const img = Image.create({
            'id' : id ,
            'image' : uploadedImageUrl
        })
        res.status(200).json({message : "image uploaded Sucessfully" , img})
        console.log(img)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
