const mongoose = require('mongoose')

const Staffinfoschema = mongoose.Schema(
    {
        id : {type : String, required : true},
        name : {type : String, required : true},
        gender : {type : String, required : true},
        dob : {type : Date, required : true},
        age : Number,
        email : {type : String, required : true},
        phone : {type : Number, required : true},
        password : {type : String, required : true},

    }
)

const Staffinfo = mongoose.model("Staffinfo",Staffinfoschema)
module.exports = Staffinfo