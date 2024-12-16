const mongoose = require("mongoose")

const Sheduleschema = new mongoose.Schema({
    doctorid : {type: String},
    day : {type : String},
    slot:[
        {
            starttime: {type: String},
            endtime: {type: String},
            status: {type: String}
        }
    ]
})

const Shedule = mongoose.model("shedule" , Sheduleschema)
module.exports = Shedule;