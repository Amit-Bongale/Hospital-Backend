const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    image: String,
    userId: String
})

const Image = mongoose.model("image" , ImageSchema)
module.exports = Image