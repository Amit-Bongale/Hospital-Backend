const mongoose = require('mongoose')


const Admissioninfoschema = mongoose.Schema(
    {
        
        patientid : {type : String, required : true},
        patientname :{type : String, required : true},
        doctorid :{type : String, required : true},
        staffid :{type : String, required : true},
        wardno : String,
        wardtype : String,
        bedno : String,
        admissiondateandtime : Date,
        dischargedateandtime : Date,
        reason : {type : String, required : true},
        
    }
)
const Admissioninfo = mongoose.model("Admission",Admissioninfoschema)
module.exports = Admissioninfo;






