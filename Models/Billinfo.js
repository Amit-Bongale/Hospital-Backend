const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Billschema = new mongoose.Schema({
    patientid : {type : String},
    Date : {type: Date, default: Date.now()},
    status : {type: String, default:"not paid"},
    fees : {
        consultationfee : {type : Number , default: 100},
        testfee : {type : Number, default : 0},
        admissionfee : {type : Number, default : 0}
    },
});

Billschema.plugin(AutoIncrement, { inc_field: "billno" });

const Bill = mongoose.model('Bill' , Billschema);
module.exports = Bill;