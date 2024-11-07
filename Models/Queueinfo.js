    const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
    id : {type : String , required: true},
    name : {type : String , required: true},
    gender : {type : String , required: true},
    disease : {type : String , required: true},
    type : {type : String},
    mobileno : {type : String , required: true},
    status : {type: String}
})

const Queue = mongoose.model('Queue', QueueSchema)
module.exports = Queue;