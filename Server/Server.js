const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // adjust this for production
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  //join room based on id for scoped messages
  socket.on('joinRoom', ({ role, id }) => {
    if (role === 'doctor') socket.join(`doctor_${id}`);
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

module.exports = { server, io, app }; // Export server & io