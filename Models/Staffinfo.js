const mongoose = require('mongoose')

const Staffinfoschema = mongoose.Schema(
    {
        id : {type : String, required : true , unique: true},
        name : {type : String, required : true},
        gender : {type : String, required : true},
        email : {type : String, required : true , unique: true},
        phone : {type : Number, required : true , unique: true},
        role : {type : String , required : true},
        experience : Number,
        dob : {type : Date, required : true},
        password : {type : String, required : true},
        image : String,
        status : Boolean,
    }
)

// StaffInfoSchema.index({ email: 1 }, { unique: true });

const Staffinfo = mongoose.model("Staff",Staffinfoschema)
module.exports = Staffinfo