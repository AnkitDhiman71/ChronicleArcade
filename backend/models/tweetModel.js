import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
