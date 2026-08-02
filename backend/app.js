import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './db.js';
import userRoutes from './routes/userRoutes.js';
import contactUsRoutes from './routes/contactusRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import tweetRoutes from './routes/tweetRoutes.js';

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use('/api/auth', userRoutes);
app.use('/api/auth/contactus', contactUsRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/tweets', tweetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
