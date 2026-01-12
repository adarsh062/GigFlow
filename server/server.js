require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http'); // NEW
const { Server } = require('socket.io'); // NEW

const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const bidRoutes = require('./routes/bidRoutes');

const app = express();
const server = http.createServer(app); // NEW: Wrap Express app

// NEW: Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Save io instance to use in controllers
app.set('socketio', io);

// Track connected users
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins a room with their User ID
  socket.on('setup', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

const PORT = process.env.PORT || 5000;
// CHANGED: app.listen -> server.listen
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));