const mongoose = require('mongoose')

const Doctorinfoschema = mongoose.Schema(
    {

        id : {type : String, required : true},
        name : {type : String, required : true},
        gender : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true},
        specialization : {type : String, required : true},
        phone : {type : String, required : true},
        experience : Number,
        dob : Date,

    }
)
const Doctorinfo = mongoose.model("Doctorinfo",Doctorinfoschema)
module.exports = Doctorinfo;

