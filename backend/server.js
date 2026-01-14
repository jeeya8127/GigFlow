import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import gigRoutes from './routes/gigRoutes.js';
import cookieParser from 'cookie-parser';
import bidRoutes from './routes/bidRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/gigs', gigRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bids', bidRoutes);
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PATCH"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('join_room', (userId) => {
        socket.join(userId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.set('socketio', io);

app.get('/', (req, res) => {
    res.send("Backend is running with Socket and CORS!");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  });
  
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});