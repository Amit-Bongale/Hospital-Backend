const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    staffid : {type: String , required: true},
    patientid : {type : String , required: true},
    patientname : {type : String , required: true},
    doctorid : {type: String , required: true},
    testname : {type: String , required: true},
    result : {type: String},
    status : {type: String},
    fee : {type: Number},
    date : {type: Date, default: Date.now}
})

const Test = mongoose.model('Test', TestSchema)
module.exports = Test;

