const mongoose = require('mongoose')

const ContactusScheme = mongoose.Schema({
    name: {type: String, require : true},
    email: {type: String, require : true},
    message: {type: String, require : true},
    date: {type: Date, default: Date.now}
})

const Contactus = mongoose.model('Contactus' , ContactusScheme)
module.exports = Contactus