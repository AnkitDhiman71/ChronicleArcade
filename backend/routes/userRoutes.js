import express from 'express';
import { getMe, getLeaderboard, login, logout, register } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);
router.get('/leaderboard', getLeaderboard);

export default router;
