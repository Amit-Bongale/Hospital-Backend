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


const Adminroute = require('./Router/AdminRoute')
const Doctorroute = require('./Router/DoctorRoute')
const Patientroute = require('./Router/PatientRoute')
const Staffroute = require('./Router/StaffRoute')
const Appointment = require('./Router/AppointmentRoute')
const salaryroute = require('./Router/SalaryRoute')
const Testroute = require('./Router/Testroute')
const Queueroute = require('./Router/Queueroute')
const Contactusroute = require('./Router/ContactusRoute')
const Admissionroute = require('./Router/AdmissionRoute')
const Medicalhistoryroute = require('./Router/MedicalhistoryRoute')
const Billroute = require('./Router/BillRoute')
const Wardroute = require('./Router/WardRoute') 




app.use('/admin' , Adminroute) 
app.use('/doctor' , Doctorroute)
app.use('/patient' , Patientroute)
app.use('/staff' , Staffroute)
app.use('/appointment' , Appointment)
app.use('/salary' , salaryroute)
app.use('/test', Testroute)
app.use('/queue', Queueroute)
app.use('/contactus' , Contactusroute)
app.use('/admission' , Admissionroute)
app.use('/medicalhistory' , Medicalhistoryroute)
app.use('/bill' , Billroute)
app.use('/ward' , Wardroute)