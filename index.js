const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv');
env.config()
const port = 3000 || process.env.PORT
const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBCONNECTION)
.then(() => console.log("Connected to Database"))
.catch((e) => console.log("Error connecting to db" , e))

app.listen(port , () => {
    console.log("Server is Running on port 3000")
})



const Adminroute = require('./Router/Adminroute')
const Doctorroute = require('./Router/Doctorroute')
const Patientroute = require('./Router/Patientroute')
const Staffroute = require('./Router/Staffroute')
const Appointment = require('./Router/Appointmentrote')
const salaryroute = require('./Router/Salaryroute')


app.use('/admin' , Adminroute) 
app.use('/doctor' , Doctorroute)
app.use('/patient' , Patientroute)
app.use('/staff' , Staffroute)
app.use('/appointment' , Appointment)
app.use('/salary' , salaryroute)
