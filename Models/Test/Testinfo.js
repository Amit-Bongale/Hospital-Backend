const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    staffid : {type: String , required: true},
    patientid : {type : String , required: true},
    doctorid : {type: String , required: true},
    testname : {type: String , required: true},
    result : {type: String},
    status : {type: String},
})

const Test = mongoose.model('Test', TestSchema)
module.exports = Test;