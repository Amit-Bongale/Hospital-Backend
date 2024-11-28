const mongoose = require('mongoose')

const MedicalhistorySchema = new mongoose.Schema({
    patientid : {type : String , required: true},
    doctorid : {type: String , required: true},
    doctorname : {type : String},
    date : {type: Date, default: Date.now},
    disease : {type: String , required: true},
    appointmenttype : {type : String, required : true},
    prescription : {type: String},
}) 

const Medicalhistory = mongoose.model('Medicalhistory', MedicalhistorySchema)
module.exports = Medicalhistory;