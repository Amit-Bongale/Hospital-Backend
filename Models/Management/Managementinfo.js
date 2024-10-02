const mongoose = require('mongoose')

const Appointmentinfoschema = mongoose.Schema(
    {
       doctorid : {type : String , required : true},
       doctorname : {type : String , required : true},
       patientid : {type : String , required : true},
       scheduleddate : {type : Date , required : true}, 
       Scheduledtime : {type : String , required : true},
       Status : {type : String , required : true},
       Consultantfee : {type : Number , required : true}
    }
)

const Appointmentinfo = mongoose.model("Appointmentinfo", Appointmentinfoschema)
module.exports = Appointmentinfo;