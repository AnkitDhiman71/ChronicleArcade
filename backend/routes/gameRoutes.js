import express from 'express';
import { getAllGames, getGameById, createGame, deleteGame } from '../controllers/gameController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', authMiddleware, adminMiddleware, createGame);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGame);

export default router;
