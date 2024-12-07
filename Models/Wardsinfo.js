const mongoose = require('mongoose')

const Wardinfo = mongoose.Schema({
    wardnumber : {type: String, required: true},
    type: {type: String, required: true},
    bednumber: {type: String, required: true},
    status: {type: String, required: true, default:'unoccupied'},
})

const Ward = mongoose.model('Ward', Wardinfo)
module.exports = Ward;