import fs from 'fs';
import path from 'path';
import Tweet from '../models/tweetModel.js';

export const createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Tweet content is required' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const tweet = await Tweet.create({
      content,
      image: imagePath,
    });

    return res.status(201).json({
      message: 'Tweet posted successfully',
      tweet,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to create tweet' });
  }
};

export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    return res.status(200).json({ tweets });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch tweets' });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    if (tweet.image) {
      const fullPath = path.join(process.cwd(), tweet.image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to delete tweet' });
  }
};
