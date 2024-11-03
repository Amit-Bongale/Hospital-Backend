const mongoose = require('mongoose')


const Admininfoschema = mongoose.Schema(
    {
        
        id : {type : String, required : true},
        name :{type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true},
        phone : Number,
        address : String,
        gender : String,
        image : String

    }
)
const Admininfo = mongoose.model("Admin",Admininfoschema)
module.exports = Admininfo;






