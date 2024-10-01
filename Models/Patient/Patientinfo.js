const mongoose = require('mongoose')

const Patientinfoschema = mongoose.Schema(
    {

        id : {type : String, required : true},
        name : {type : String, required : true},
        gender : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true},
        dob : Date,
        age : {type : Number, required : true},
        phone : {type : String, required : true},
        emergencycontact : Number,
        address : {type : String, required : true},
        bloodgroup : {type : String, required : true},
        adharno : {type : Number, required : true},
        medicalhistory : String

    }
)
const Patientinfo = mongoose.model("Patientinfo",Patientinfoschema)
module.exports = Patientinfo;

