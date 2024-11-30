const mongoose = require('mongoose')

const Wardinfo = mongoose.Schema({
    number : {type: String, required: true},
    ward_status: {type: String, required: true},
    ward_type: {type: String, required: true},
    ward_capacity: {type: Number, required: true},
    ward_bed: {type: String, required: true},
})

const Ward = mongoose.model('Ward', Wardinfo)
module.exports = Ward;