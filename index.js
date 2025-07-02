const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");

const env = require("dotenv");
env.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// enable cors for deployed site
const allowedOrigins = [
  "https://hospital-management-system-x1n5.onrender.com",
  "https://hospital-managementsystem.vercel.app",  // vercel frontend
  "http://localhost:3001" // Add local frontend for testing
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});
global.io = io;

// db connection
mongoose.connect(process.env.DBCONNECTION)
.then(() => console.log("Connected to Database"))
.catch((e) => console.log("Error connecting to db", e));


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


const AuthVerify = require("./Middleware/AuthVerify.js");



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
app.use("/auth", AuthVerify);



io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  //join room based on id for scoped messages
  socket.on('joinRoom', ({ role, id }) => {
    if (role === 'doctor') {
      socket.join(`doctor_${id}`);
      console.log(`Doctor ${id} joined room doctor_${id}`);
    }
    if (role === 'staff') socket.join('staff');
    if (role === 'admin') socket.join('admin');
    if (role === 'patient') socket.join(`patient_${id}`);
  });

  socket.on("logout", ({ role, id }) => {
    if (role === "staff") {
      socket.leave("staff");
    } else if (role === "admin") {
      socket.leave("admin");
    } else {
      socket.leave(`${role}_${id}`);
    }
    console.log(`${role} ${id} logged out and left room(s)`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { io };