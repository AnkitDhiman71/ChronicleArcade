import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createTweet, getTweets, deleteTweet } from '../controllers/tweetController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getTweets);
router.post('/', upload.single('image'), createTweet);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTweet);

export default router;
