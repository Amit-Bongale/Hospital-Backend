const mongoose = require('mongoose')

const Appointmentschema = mongoose.Schema(
   {
      doctorid : {type : String , required : true},
      doctorname : {type : String , required : true},
      doctorspecialization : {type: String},
      patientid : {type : String , required : true},
      scheduleddate : {type : Date , required : true}, 
      scheduledtime : {type : String , required : true},
      type : {type : String},
    //    type : [pending, upcomming, cancelled , completed, ]
      disease : {type : String },
      status : {type : String , required : true , default : "Pending"},
      consultantfee : {type : Number , required : true}
   }
)

const Appointment = mongoose.model("Appointment", Appointmentschema)
module.exports = Appointment;