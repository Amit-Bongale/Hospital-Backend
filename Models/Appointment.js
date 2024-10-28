const mongoose = require('mongoose')

const Appointmentschema = mongoose.Schema(
    {
       doctorid : {type : String , required : true},
       doctorname : {type : String , required : true},
       patientid : {type : String , required : true},
       scheduleddate : {type : Date , required : true}, 
       scheduledtime : {type : String , required : true},
       status : {type : String , required : true},
       consultantfee : {type : Number , required : true}
    }
)

const Appointment = mongoose.model("Appointmentinfo", Appointmentschema)
module.exports = Appointment;