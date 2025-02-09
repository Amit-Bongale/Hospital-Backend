const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const env = require("dotenv");
env.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// enable cors for deployed site
const allowedOrigins = [
    "https://hospital-management-system-x1n5.onrender.com", 
    "http://localhost:3001" // Add local frontend for testing
];

app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // Allow cookies/auth headers
    })
  );


mongoose.connect(process.env.DBCONNECTION)
.then(() => console.log("Connected to Database"))
.catch((e) => console.log("Error connecting to db", e));

app.listen(port, () => {
  console.log("Server is Running on port 3000");
});


// Routes

const Adminroute = require("./Router/Adminroute.js");
const Doctorroute = require("./Router/Doctorroute.js");
const Patientroute = require("./Router/Patientroute.js");
const Staffroute = require("./Router/Staffroute.js");
const Appointment = require("./Router/AppointmentRoute.js");
const salaryroute = require("./Router/Salaryroute.js");
const Testroute = require("./Router/Testroute.js");
const Queueroute = require("./Router/Queueroute.js");
const Contactusroute = require("./Router/ContactusRoute.js");
const Admissionroute = require("./Router/AdmissionRoute.js");
const Medicalhistoryroute = require("./Router/MedicalhistoryRoute.js");
const Billroute = require("./Router/BillRoute.js");
const Wardroute = require("./Router/WardRoute.js");



app.use("/admin", Adminroute);
app.use("/doctor", Doctorroute);
app.use("/patient", Patientroute);
app.use("/staff", Staffroute);
app.use("/appointment", Appointment);
app.use("/salary", salaryroute);
app.use("/test", Testroute);
app.use("/queue", Queueroute);
app.use("/contactus", Contactusroute);
app.use("/admission", Admissionroute);
app.use("/medicalhistory", Medicalhistoryroute);
app.use("/bill", Billroute);
app.use("/ward", Wardroute);
