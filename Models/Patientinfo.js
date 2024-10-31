const mongoose = require('mongoose')

const Patientinfoschema = mongoose.Schema(
    {

        id : {type : String, required : true, unique:true},
        name : {type : String, required : true},
        gender : {type : String, required : true},
        email : {type : String},
        password : {type : String},
        dob : Date,
        age : {type : Number, required : true},
        phone : {type : Number, required : true},
        emergencycontact : Number,
        address : {type : String, required : true},
        bloodgroup : {type : String, required : true},
        aadharno : {type : Number, required : true, unique:true},
        medicalhistory : String,
    }
)
const Patientinfo = mongoose.model("Patientinfo",Patientinfoschema)
module.exports = Patientinfo;

