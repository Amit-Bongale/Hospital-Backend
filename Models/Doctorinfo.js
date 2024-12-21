const mongoose = require('mongoose')

const Doctorinfoschema = mongoose.Schema(
    {
        id : { type : String, required : true , unique: true },
        name : { type : String, required : true },
        gender : { type : String, required : true },
        email : { type : String, required : true, unique: true },
        password : { type : String, required : true },
        specialization : { type : String, required : true },
        phone : { type : String, required : true , unique: true },
        experience : Number,
        dob : Date,
        image : String,
        status : Boolean 
    }
)
const Doctorinfo = mongoose.model("Doctor",Doctorinfoschema)
module.exports = Doctorinfo , Doctorinfoschema;